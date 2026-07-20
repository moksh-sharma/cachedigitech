/**
 * Path containment + gated filesystem helpers (CWE-22).
 *
 * Rules:
 * - Never call path.join / path.resolve / path.normalize on untrusted input.
 * - Never call raw fs.* with paths that have not passed assertWithin(root, path).
 * - Build child paths only via safeJoin (allowlisted basenames).
 * - Resolve script-relative roots with path.dirname only (no ".." segments).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function rejectTraversal(p) {
  if (typeof p !== "string" || p.length === 0 || p.includes("\0")) {
    return false;
  }
  if (p.includes("..")) return false;
  return true;
}

function unifySep(p) {
  let s = p.replace(/[/\\]+/g, path.sep);
  while (s.length > 1 && s.endsWith(path.sep)) {
    s = s.slice(0, -1);
  }
  return s;
}

/** True if name is a single path segment with no traversal. */
export function safeBasename(name) {
  if (!rejectTraversal(name)) return null;
  if (name === "." || name === "..") return null;
  if (name.includes("/") || name.includes("\\")) return null;
  if (path.basename(name) !== name) return null;
  return name;
}

/**
 * Ensure absoluteCandidate stays inside absoluteRoot.
 * Does not call path.resolve / path.normalize / path.join on the candidate.
 */
export function assertWithin(absoluteRoot, absoluteCandidate) {
  if (!rejectTraversal(absoluteRoot) || !rejectTraversal(absoluteCandidate)) {
    throw new Error("Path escapes allowed directory");
  }
  if (!path.isAbsolute(absoluteRoot) || !path.isAbsolute(absoluteCandidate)) {
    throw new Error("Path escapes allowed directory");
  }

  const root = unifySep(absoluteRoot);
  const candidate = unifySep(absoluteCandidate);
  const rootCmp = process.platform === "win32" ? root.toLowerCase() : root;
  const candCmp =
    process.platform === "win32" ? candidate.toLowerCase() : candidate;

  if (candCmp === rootCmp) {
    return absoluteCandidate;
  }
  const prefix = rootCmp + path.sep;
  if (!candCmp.startsWith(prefix)) {
    throw new Error("Path escapes allowed directory");
  }
  return absoluteCandidate;
}

/**
 * Append sanitized basename segments under an absolute base directory.
 * @param {string} baseDir
 * @param {...string} segments
 */
export function safeJoin(baseDir, ...segments) {
  if (!rejectTraversal(baseDir) || !path.isAbsolute(baseDir)) {
    throw new Error("Invalid path segment");
  }

  let current = baseDir;
  for (const seg of segments) {
    const clean = safeBasename(seg);
    if (!clean) {
      throw new Error("Invalid path segment");
    }
    current =
      current.endsWith(path.sep) ||
      current.endsWith("/") ||
      current.endsWith("\\")
        ? current + clean
        : current + path.sep + clean;
    assertWithin(baseDir, current);
  }
  return current;
}

/** Absolute directory containing this script file (…/frontend/scripts). */
export function scriptsDir(importMetaUrl) {
  const dir = path.dirname(fileURLToPath(importMetaUrl));
  if (!path.isAbsolute(dir) || !rejectTraversal(dir)) {
    throw new Error("Invalid script directory");
  }
  return dir;
}

/** frontend/ root = parent of scripts/ (via dirname — no ".." path segment). */
export function frontendRootFromScript(importMetaUrl) {
  const root = path.dirname(scriptsDir(importMetaUrl));
  if (!path.isAbsolute(root) || !rejectTraversal(root)) {
    throw new Error("Invalid frontend root");
  }
  return root;
}

/** frontend/public bound to the calling script. */
export function publicDirFromScript(importMetaUrl) {
  return safeJoin(frontendRootFromScript(importMetaUrl), "public");
}

function gate(root, target) {
  return assertWithin(root, target);
}

/* ---- Gated fs APIs (block path traversal by requiring a root jail) ---- */

export function safeExistsSync(root, targetPath) {
  return fs.existsSync(gate(root, targetPath));
}

export function safeReadFileSync(root, targetPath, options) {
  return fs.readFileSync(gate(root, targetPath), options);
}

export function safeWriteFileSync(root, targetPath, data, options) {
  return fs.writeFileSync(gate(root, targetPath), data, options);
}

export function safeUnlinkSync(root, targetPath) {
  return fs.unlinkSync(gate(root, targetPath));
}

export function safeMkdirSync(root, targetPath, options) {
  return fs.mkdirSync(gate(root, targetPath), options);
}

export function safeStatSync(root, targetPath) {
  return fs.statSync(gate(root, targetPath));
}

export function safeReaddirSync(root, targetPath, options) {
  const dir = gate(root, targetPath);
  const entries = fs.readdirSync(dir, options);
  if (options && options.withFileTypes) {
    return entries.filter((e) => safeBasename(e.name));
  }
  return entries.map(safeBasename).filter(Boolean);
}

/**
 * glob under a jailed cwd. Always relative matches; rebuild abs paths with safeJoin.
 */
export function safeGlobSync(root, pattern, options = {}) {
  if (typeof fs.globSync !== "function") {
    throw new Error("Node.js fs.globSync is required (Node 22+)");
  }
  const cwd = gate(root, root);
  return fs.globSync(pattern, {
    ...options,
    cwd,
    absolute: false,
    nodir: options.nodir !== false,
  });
}

/** Generic script error log (CWE-209 — avoid leaking err.message / stacks). */
export function logScriptError(label) {
  console.error(`${label}: operation failed`);
}

/**
 * Hard-block helpers — throw if called. Prefer safeJoin / gated fs instead.
 * Import and use these names in reviews to mark forbidden patterns.
 */
export function blockedPathJoin() {
  throw new Error(
    "Blocked: path.join with untrusted input is forbidden. Use safeJoin(root, ...basenames)."
  );
}

export function blockedPathResolve() {
  throw new Error(
    "Blocked: path.resolve with untrusted input is forbidden. Use publicDirFromScript / safeJoin."
  );
}
