/**
 * Path containment helpers for build scripts (CWE-22).
 * Ensures resolved paths stay inside an allowed root directory.
 */
import path from "path";

/**
 * Resolve candidate and throw if it escapes baseDir.
 * @param {string} baseDir
 * @param {string} candidatePath
 * @returns {string} resolved absolute path
 */
export function assertWithin(baseDir, candidatePath) {
  const resolvedBase = path.resolve(baseDir);
  const resolved = path.resolve(candidatePath);
  const prefix = resolvedBase.endsWith(path.sep)
    ? resolvedBase
    : resolvedBase + path.sep;
  if (resolved !== resolvedBase && !resolved.startsWith(prefix)) {
    throw new Error("Path escapes allowed directory");
  }
  return resolved;
}

/**
 * Join segments under baseDir after rejecting traversal / absolute segments.
 * @param {string} baseDir
 * @param {...string} segments
 * @returns {string}
 */
export function safeJoin(baseDir, ...segments) {
  for (const seg of segments) {
    if (typeof seg !== "string" || seg.length === 0) {
      throw new Error("Invalid path segment");
    }
    if (
      path.isAbsolute(seg) ||
      seg.includes("\0") ||
      seg === ".." ||
      seg.includes(`..${path.sep}`) ||
      seg.includes(`${path.sep}..`) ||
      seg.includes("../") ||
      seg.includes("..\\")
    ) {
      throw new Error("Invalid path segment");
    }
  }
  return assertWithin(baseDir, path.join(baseDir, ...segments));
}

/**
 * Sanitize a filename from readdir (basename only, no traversal).
 * @param {string} name
 * @returns {string|null}
 */
export function safeBasename(name) {
  if (typeof name !== "string" || name.length === 0) return null;
  const base = path.basename(name);
  if (
    base !== name ||
    base === "." ||
    base === ".." ||
    base.includes("\0")
  ) {
    return null;
  }
  return base;
}

/** Generic script error log (CWE-209 — avoid leaking err.message / stacks). */
export function logScriptError(label) {
  console.error(`${label}: operation failed`);
}
