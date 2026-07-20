/**
 * Removes NETSCAPE2.0 loop extension so loading.gif plays once in browsers.
 * Run: node scripts/strip-loading-gif-loop.mjs
 *
 * All FS access is jailed under public/ via path-safe gated APIs (CWE-22).
 */
import {
  safeJoin,
  safeReadFileSync,
  safeWriteFileSync,
  publicDirFromScript,
} from "./path-safe.mjs";

const publicDir = publicDirFromScript(import.meta.url);
const gifPath = safeJoin(publicDir, "loading.gif");
const b = safeReadFileSync(publicDir, gifPath);
const marker = Buffer.from("NETSCAPE2.0");
const idx = b.indexOf(marker);
if (idx < 0) {
  console.log("loading.gif: no NETSCAPE loop block (already plays once)");
  process.exit(0);
}
let start = idx - 2;
while (start > 0 && !(b[start] === 0x21 && b[start + 1] === 0xff)) start -= 1;
const end = idx + 17;
safeWriteFileSync(
  publicDir,
  gifPath,
  Buffer.concat([b.subarray(0, start), b.subarray(end)])
);
console.log("loading.gif: removed infinite-loop extension");
