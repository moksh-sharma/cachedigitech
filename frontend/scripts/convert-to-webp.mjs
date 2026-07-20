/**
 * Converts PNG/JPEG/JPG under frontend/public to WebP.
 * Run: node scripts/convert-to-webp.mjs
 *
 * All FS access is jailed under public/ via path-safe gated APIs (CWE-22).
 */
import sharp from "sharp";
import path from "path";
import {
  safeBasename,
  safeJoin,
  safeGlobSync,
  publicDirFromScript,
  logScriptError,
} from "./path-safe.mjs";

const publicDir = publicDirFromScript(import.meta.url);

const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const GLOB_PATTERN = "**/*.{png,jpg,jpeg,PNG,JPG,JPEG}";

function listImageSegmentPaths() {
  const relativePaths = safeGlobSync(publicDir, GLOB_PATTERN, { nodir: true });
  const results = [];
  for (const rel of relativePaths) {
    const rawParts = rel.split(/[/\\]/).filter((p) => p.length > 0);
    const segments = [];
    let ok = true;
    for (const part of rawParts) {
      const clean = safeBasename(part);
      if (!clean) {
        ok = false;
        break;
      }
      segments.push(clean);
    }
    if (!ok || segments.length === 0) continue;

    const ext = path.extname(segments[segments.length - 1]).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;

    results.push(segments);
  }
  return results;
}

function toWebpSegments(segments) {
  const fileName = segments[segments.length - 1];
  const ext = path.extname(fileName);
  const base = safeBasename(fileName.slice(0, -ext.length));
  const outName = base ? safeBasename(`${base}.webp`) : null;
  if (!base || !outName) return null;
  return segments.slice(0, -1).concat(outName);
}

async function main() {
  let count = 0;
  for (const segments of listImageSegmentPaths()) {
    const outSegments = toWebpSegments(segments);
    if (!outSegments) continue;

    const abs = safeJoin(publicDir, ...segments);
    const outPath = safeJoin(publicDir, ...outSegments);

    try {
      await sharp(abs).webp({ quality: 85 }).toFile(outPath);
      console.log("OK", outSegments.join("/"));
      count++;
    } catch {
      logScriptError(segments.join("/"));
    }
  }
  console.log("\nConverted", count, "images to WebP.");
}

main();
