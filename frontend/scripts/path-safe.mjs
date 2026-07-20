/**
 * Path containment helpers for offline build scripts (CWE-22).
 *
 * No filesystem I/O here — scanners treat fs.*(variablePath) as path traversal.
 * Scripts must open files only via paths from import.meta.url literals or
 * paths built with safeJoin / assertWithin after basename allowlisting.
 *
 * Rules:
 * - Never call path.join / path.resolve / path.normalize on untrusted input.
 * - Build child paths only via safeJoin (allowlisted basenames).
 * - Resolve script-relative roots with path.dirname only (no ".." segments).
 */
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

/**
 * Absolute path under public/ from allowlisted relative segments.
 * Resolves via import.meta.url (no path.join on untrusted input).
 */
export function publicUrlPath(importMetaUrl, relativeUnderPublic) {
  if (typeof relativeUnderPublic !== "string" || relativeUnderPublic.includes("\0")) {
    throw new Error("Invalid public path");
  }
  const rel = relativeUnderPublic.replace(/^\/+/, "").replace(/\\/g, "/");
  const parts = rel.split("/").filter((p) => p.length > 0);
  if (parts.length === 0) {
    throw new Error("Invalid public path");
  }
  for (const part of parts) {
    if (!safeBasename(part)) {
      throw new Error("Invalid public path");
    }
  }
  const abs = fileURLToPath(
    new URL(`../public/${parts.join("/")}`, importMetaUrl)
  );
  return assertWithin(publicDirFromScript(importMetaUrl), abs);
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

/** Generic script error log (CWE-209 — avoid leaking err.message / stacks). */
export function logScriptError(label) {
  console.error(`${label}: operation failed`);
}

/**
 * Hard-block helpers — throw if called. Prefer safeJoin / publicUrlPath.
 */
export function blockedPathJoin() {
  throw new Error(
    "Blocked: path.join with untrusted input is forbidden. Use safeJoin / publicUrlPath."
  );
}

export function blockedPathResolve() {
  throw new Error(
    "Blocked: path.resolve with untrusted input is forbidden. Use publicDirFromScript / safeJoin."
  );
}
