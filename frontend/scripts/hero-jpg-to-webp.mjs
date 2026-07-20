/**
 * Convert .jpg files in public/hero/ to .webp
 * Run from frontend: node scripts/hero-jpg-to-webp.mjs
 *
 * Directory root is an import.meta.url literal; names are basename-allowlisted (CWE-22).
 */
import path from "path";
import sharp from "sharp";
import { readdirSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  safeBasename,
  safeJoin,
  publicDirFromScript,
  assertWithin,
  logScriptError,
} from "./path-safe.mjs";

const publicDir = publicDirFromScript(import.meta.url);
const HERO_DIR = fileURLToPath(new URL("../public/hero/", import.meta.url));
assertWithin(publicDir, HERO_DIR);

async function main() {
  const files = readdirSync(HERO_DIR)
    .map(safeBasename)
    .filter((f) => f && f.toLowerCase().endsWith(".jpg"));
  if (files.length === 0) {
    console.log("No .jpg files in public/hero/");
    return;
  }
  console.log("Converting JPG to WebP in public/hero/...");
  for (const file of files) {
    const base = safeBasename(path.basename(file, path.extname(file)));
    if (!base) continue;
    const srcPath = safeJoin(HERO_DIR, file);
    const outPath = safeJoin(HERO_DIR, `${base}.webp`);
    try {
      await sharp(srcPath).webp({ quality: 85 }).toFile(outPath);
      unlinkSync(srcPath);
      console.log(`  ${file} -> ${base}.webp (removed original)`);
    } catch {
      logScriptError(file);
    }
  }
  console.log("Done.");
}

main();
