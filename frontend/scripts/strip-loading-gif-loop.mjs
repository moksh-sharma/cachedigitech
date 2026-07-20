/**
 * Removes NETSCAPE2.0 loop extension so loading.gif plays once in browsers.
 * Run: node scripts/strip-loading-gif-loop.mjs
 *
 * File path is a compile-time URL literal under public/ (CWE-22).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const gifPath = fileURLToPath(new URL("../public/loading.gif", import.meta.url));
const b = readFileSync(gifPath);
const marker = Buffer.from("NETSCAPE2.0");
const idx = b.indexOf(marker);
if (idx < 0) {
  console.log("loading.gif: no NETSCAPE loop block (already plays once)");
  process.exit(0);
}
let start = idx - 2;
while (start > 0 && !(b[start] === 0x21 && b[start + 1] === 0xff)) start -= 1;
const end = idx + 17;
writeFileSync(
  gifPath,
  Buffer.concat([b.subarray(0, start), b.subarray(end)])
);
console.log("loading.gif: removed infinite-loop extension");
