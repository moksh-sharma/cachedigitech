/**
 * Converts all PNG/JPEG/JPG images in frontend/public to WebP.
 * Run from repo root: node frontend/scripts/convert-to-webp.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { assertWithin, safeBasename, logScriptError } from './path-safe.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const SKIP = ['.gif']; // keep GIFs as-is (e.g. loading.gif)

function* walk(dir, rootDir = publicDir) {
  const safeDir = assertWithin(rootDir, dir);
  const entries = fs.readdirSync(safeDir, { withFileTypes: true });
  for (const e of entries) {
    const name = safeBasename(e.name);
    if (!name) continue;
    const full = assertWithin(rootDir, path.join(safeDir, name));
    if (e.isDirectory()) yield* walk(full, rootDir);
    else if (e.isFile()) yield full;
  }
}

async function main() {
  let count = 0;
  for (const filePath of walk(publicDir)) {
    const ext = path.extname(filePath).toLowerCase();
    if (!EXTENSIONS.includes(ext) || SKIP.includes(ext)) continue;
    const outPath = assertWithin(publicDir, filePath.slice(0, -ext.length) + '.webp');
    try {
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(outPath);
      console.log('OK', path.relative(publicDir, outPath));
      count++;
    } catch {
      logScriptError(path.relative(publicDir, filePath));
    }
  }
  console.log('\nConverted', count, 'images to WebP.');
}

main();
