/**
 * Download blog post images from URLs and save as webp in public/blog/
 * Run from frontend: node scripts/download-blog-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BLOGS = [
  { slug: "blog-1-ai-enterprise", url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85" },
  { slug: "blog-2-hybrid-cloud", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85" },
  { slug: "blog-3-cybersecurity", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=85" },
  { slug: "blog-4-digital-transformation", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85" },
  { slug: "blog-5-data-driven", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85" },
  { slug: "blog-6-infrastructure", url: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=85" },
  { slug: "blog-7-managed-services", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85" },
  { slug: "blog-8-cloud-migration", url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=85" },
  { slug: "blog-9-zero-trust", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85" },
  { slug: "blog-10-future-of-work", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85" },
];

const OUT_DIR = path.join(__dirname, "..", "public", "blog");

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log("Downloading blog images and converting to webp...");

  for (const { slug, url } of BLOGS) {
    try {
      const buffer = await fetchBuffer(url);
      const outPath = path.join(OUT_DIR, `${slug}.webp`);
      await sharp(buffer)
        .webp({ quality: 85 })
        .toFile(outPath);
      console.log(`  ${slug}.webp`);
    } catch (err) {
      console.error(`  ${slug}: ${err.message}`);
    }
  }

  console.log("Done. Local paths: /blog/<slug>.webp");
}

main();
