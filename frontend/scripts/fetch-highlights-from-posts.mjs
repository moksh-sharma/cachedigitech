/**
 * Downloads Latest Highlights card images from LinkedIn post pages.
 * Direct media.licdn.com URLs in data often expire (403); each post's og:image
 * contains a fresh signed CDN URL for the same photo.
 *
 * Run from frontend/: node scripts/fetch-highlights-from-posts.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { safeJoin, logScriptError } from './path-safe.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'public', 'images', 'highlights');

const POST_URLS = [
  'https://www.linkedin.com/posts/prarthana-gupta-112510a5_apacfemaleleaderoftheyear-ingrammicro-washingtondc-activity-7419750364259762177-fmvf/',
  'https://www.linkedin.com/posts/prarthana-gupta-112510a5_technology-breathe-cache-activity-7383343055010979840-Jay2/',
  'https://www.linkedin.com/posts/prarthana-gupta-112510a5_delltechnologies-cache-partnerships-activity-7369212066651394048-KO8s/',
  'https://www.linkedin.com/posts/prarthana-gupta-112510a5_we-are-delighted-to-share-that-cache-digitech-activity-7351302613625155584-T3lR/',
  'https://www.linkedin.com/posts/nitika-mehta-b7b11a18_imc2025-digitalindia-telecom-ugcPost-7382066224739848192-gECd/',
  'https://www.linkedin.com/posts/cache-digitech-pvt-ltd_award-servicesbusinessinida-itsector-ugcPost-7215991568502071296-7lZQ/',
  'https://www.linkedin.com/posts/etcio_etcioac24-etcio-etcioac24-activity-7200119202781814784-CEya/',
];

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function decodeHtmlEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractOgImage(html) {
  const m = html.match(/property="og:image"\s+content="([^"]+)"/i);
  if (m) return decodeHtmlEntities(m[1]);
  const m2 = html.match(/content="([^"]+)"\s+property="og:image"/i);
  if (m2) return decodeHtmlEntities(m2[1]);
  return null;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`GET failed with status ${res.status}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      Referer: 'https://www.linkedin.com/',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`GET image failed with status ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const results = [];

  for (let i = 0; i < POST_URLS.length; i++) {
    const postUrl = POST_URLS[i];
    const slug = `highlight-${String(i + 1).padStart(2, '0')}.webp`;
    const dest = safeJoin(outDir, slug);
    console.log(`[${i + 1}/${POST_URLS.length}] fetching highlight`);

    const html = await fetchText(postUrl);
    const imageUrl = extractOgImage(html);
    if (!imageUrl) {
      throw new Error(`No og:image found for highlight ${i + 1}`);
    }
    if (!imageUrl.includes('media.licdn.com')) {
      console.warn('  og:image is not LinkedIn CDN');
    }

    const buf = await fetchBuffer(imageUrl);
    await sharp(buf)
      .webp({ quality: 85, effort: 4 })
      .toFile(dest);

    results.push(`/images/highlights/${slug}`);
    console.log('  ->', path.relative(outDir, dest), `(${Math.round(fs.statSync(dest).size / 1024)} KB)`);
  }

  console.log('\nPublic paths for blogsAndHighlights.js:');
  results.forEach((p) => console.log(`  ${p}`));
}

main().catch(() => {
  logScriptError('fetch-highlights');
  process.exit(1);
});
