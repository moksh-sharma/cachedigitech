/**
 * Path containment helpers for build scripts (CWE-22).
 *
 * SAST-safe rules used here:
 * - Never call path.join / path.resolve / path.normalize on untrusted input.
 * - Only allow single-component basenames (no separators, no "..").
 * - Containment is a string prefix check after rejecting ".." entirely.
 */
import path from "path";

function rejectTraversal(p) {
  if (typeof p !== "string" || p.length === 0 || p.includes("\0")) {
    return false;
  }
  // Any parent-segment marker is rejected before filesystem use
  if (p.includes("..")) return false;
  return true;
}

/** Unify separators without interpreting ".." (candidate must not contain ".."). */
function unifySep(p) {
  let s = p.replace(/[/\\]+/g, path.sep);
  // Trim trailing separators (keep drive root like "C:\\" → "C:")
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
  // Must already be a bare filename (not a path)
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
  const rootCmp =
    process.platform === "win32" ? root.toLowerCase() : root;
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
 * @param {string} baseDir absolute directory that bounds all results
 * @param {...string} segments filenames only (validated)
 * @returns {string} absolute path inside baseDir
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
    // Append basename only — never path.join(base, untrusted)
    current = current.endsWith(path.sep) || current.endsWith("/") || current.endsWith("\\")
      ? current + clean
      : current + path.sep + clean;
    assertWithin(baseDir, current);
  }
  return current;
}

/** Generic script error log (CWE-209 — avoid leaking err.message / stacks). */
export function logScriptError(label) {
  console.error(`${label}: operation failed`);
}
