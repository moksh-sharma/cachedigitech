/**
 * Converts all PNG/JPEG/JPG images in frontend/public to WebP.
 * Run from repo root: node frontend/scripts/convert-to-webp.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const SKIP = ['.gif']; // keep GIFs as-is (e.g. loading.gif)

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile()) yield full;
  }
}

async function main() {
  let count = 0;
  for (const filePath of walk(publicDir)) {
    const ext = path.extname(filePath).toLowerCase();
    if (!EXTENSIONS.includes(ext) || SKIP.includes(ext)) continue;
    const outPath = filePath.slice(0, -ext.length) + '.webp';
    try {
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(outPath);
      console.log('OK', path.relative(publicDir, outPath));
      count++;
    } catch (err) {
      console.error('FAIL', filePath, err.message);
    }
  }
  console.log('\nConverted', count, 'images to WebP.');
}

main();
