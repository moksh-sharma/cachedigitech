/**
 * Removes NETSCAPE2.0 loop extension so loading.gif plays once in browsers.
 * Run after replacing public/loading.gif: node scripts/strip-loading-gif-loop.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gifPath = path.join(__dirname, "../public/loading.gif");
const b = fs.readFileSync(gifPath);
const marker = Buffer.from("NETSCAPE2.0");
const idx = b.indexOf(marker);
if (idx < 0) {
  console.log("loading.gif: no NETSCAPE loop block (already plays once)");
  process.exit(0);
}
let start = idx - 2;
while (start > 0 && !(b[start] === 0x21 && b[start + 1] === 0xff)) start -= 1;
const end = idx + 17;
fs.writeFileSync(gifPath, Buffer.concat([b.subarray(0, start), b.subarray(end)]));
console.log("loading.gif: removed infinite-loop extension");
