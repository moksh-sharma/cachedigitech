/**
 * Converts all PNG/JPEG/JPG images in frontend/public to WebP.
 * Run from repo root: node frontend/scripts/convert-to-webp.mjs
 *
 * Paths are built only via safeJoin(publicDir, ...basenames) so directory
 * entries from readdir never flow into path.join / path.resolve (CWE-22).
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { safeBasename, safeJoin, logScriptError } from './path-safe.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

/**
 * Yield { abs, segments } for every file under publicDir.
 * `segments` are sanitized basenames only; abs is always under publicDir.
 */
function* walk(segments = []) {
  const dir =
    segments.length === 0 ? publicDir : safeJoin(publicDir, ...segments);

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const name = safeBasename(entry.name);
    if (!name) continue;

    const childSegments = segments.concat(name);

    if (entry.isDirectory()) {
      yield* walk(childSegments);
      continue;
    }
    if (entry.isFile()) {
      yield {
        abs: safeJoin(publicDir, ...childSegments),
        segments: childSegments,
      };
    }
  }
}

function toWebpSegments(segments) {
  const fileName = segments[segments.length - 1];
  const ext = path.extname(fileName).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return null;

  const base = safeBasename(fileName.slice(0, -ext.length));
  const outName = safeBasename(`${base}.webp`);
  if (!base || !outName) return null;

  return segments.slice(0, -1).concat(outName);
}

async function main() {
  let count = 0;

  for (const { abs, segments } of walk()) {
    const outSegments = toWebpSegments(segments);
    if (!outSegments) continue;

    const outPath = safeJoin(publicDir, ...outSegments);
    try {
      await sharp(abs).webp({ quality: 85 }).toFile(outPath);
      console.log('OK', outSegments.join('/'));
      count++;
    } catch {
      logScriptError(segments.join('/'));
    }
  }

  console.log('\nConverted', count, 'images to WebP.');
}

main();
