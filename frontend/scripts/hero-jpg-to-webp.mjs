/**
 * Convert .jpg files in public/hero/ to .webp
 * Run from frontend: node scripts/hero-jpg-to-webp.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HERO_DIR = path.join(__dirname, "..", "public", "hero");

async function main() {
  const files = fs.readdirSync(HERO_DIR).filter((f) => f.toLowerCase().endsWith(".jpg"));
  if (files.length === 0) {
    console.log("No .jpg files in public/hero/");
    return;
  }
  console.log("Converting JPG to WebP in public/hero/...");
  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const srcPath = path.join(HERO_DIR, file);
    const outPath = path.join(HERO_DIR, `${base}.webp`);
    try {
      await sharp(srcPath).webp({ quality: 85 }).toFile(outPath);
      fs.unlinkSync(srcPath);
      console.log(`  ${file} -> ${base}.webp (removed original)`);
    } catch (err) {
      console.error(`  ${file}: ${err.message}`);
    }
  }
  console.log("Done.");
}

main();
