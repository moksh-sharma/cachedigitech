/**
 * Download innovation project images to public/images/innovations/
 * Run: node scripts/download-innovation-images.mjs
 *
 * Output dir is an import.meta.url literal; slugs are allowlisted (CWE-22).
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  safeBasename,
  publicDirFromScript,
  publicUrlPath,
  assertWithin,
  logScriptError,
} from "./path-safe.mjs";

const PROJECTS = [
  { slug: "techbank", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" },
  { slug: "bid-intelligence", url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" },
  { slug: "grc", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { slug: "askcache", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" },
  { slug: "crm", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
  { slug: "hrms", url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" },
  { slug: "employee-app", url: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80" },
  { slug: "cache-bi", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { slug: "edm", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { slug: "mail-integration", url: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80" },
  { slug: "cache-gpt", url: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&q=80" },
  { slug: "cache-db", url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80" },
  { slug: "cache-doc", url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80" },
  { slug: "custom-app-development", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
];

const publicDir = publicDirFromScript(import.meta.url);
const OUT_DIR = fileURLToPath(
  new URL("../public/images/innovations/", import.meta.url)
);
assertWithin(publicDir, OUT_DIR);

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log("Downloading and converting to webp...");

  for (const { slug, url } of PROJECTS) {
    const clean = safeBasename(slug);
    if (!clean) continue;
    try {
      const buffer = await fetchBuffer(url);
      const outPath = publicUrlPath(
        import.meta.url,
        `images/innovations/${clean}.webp`
      );
      await sharp(buffer).webp({ quality: 82 }).toFile(outPath);
      console.log(`  ${clean}.webp`);
    } catch {
      logScriptError(slug);
    }
  }

  console.log("Done. Local paths: /images/innovations/<slug>.webp");
}

main();
