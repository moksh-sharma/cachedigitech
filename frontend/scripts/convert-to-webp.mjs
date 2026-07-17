/**
 * Converts PNG/JPEG/JPG under frontend/public to WebP.
 * Run: node scripts/convert-to-webp.mjs
 *
 * CWE-22 hardening: never pass readdir-derived paths into path.join / fs APIs.
 * Listing uses fs.globSync with a fixed trusted cwd (publicDir); every output
 * path is rebuilt from allowlisted basenames via safeJoin.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { safeBasename, safeJoin, logScriptError } from "./path-safe.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");

const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const GLOB_PATTERN = "**/*.{png,jpg,jpeg,PNG,JPG,JPEG}";

/**
 * Return relative path segments for each image under publicDir.
 * Paths are always reconstructed with safeJoin — never reused from the FS API.
 */
function listImageSegmentPaths() {
  if (typeof fs.globSync !== "function") {
    throw new Error(
      "Node.js fs.globSync is required (Node 22+). Upgrade Node or convert images manually."
    );
  }

  const relativePaths = fs.globSync(GLOB_PATTERN, {
    cwd: publicDir,
    nodir: true,
    absolute: false,
  });

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
  const images = listImageSegmentPaths();

  for (const segments of images) {
    const outSegments = toWebpSegments(segments);
    if (!outSegments) continue;

    // Rebuild absolute paths from the trusted root + allowlisted segments only
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
