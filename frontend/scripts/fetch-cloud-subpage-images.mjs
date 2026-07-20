/**
 * Downloads Unsplash photos as WebP under public/cloud/subpages/.
 * Run: node scripts/fetch-cloud-subpage-images.mjs
 *
 * All FS access is jailed under public/ via path-safe gated APIs (CWE-22).
 */
import sharp from "sharp";
import {
  safeJoin,
  safeMkdirSync,
  publicDirFromScript,
  logScriptError,
} from "./path-safe.mjs";

const publicDir = publicDirFromScript(import.meta.url);
const outDir = safeJoin(publicDir, "cloud", "subpages");

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const jobs = [
  ["cloud-strategy", u("photo-1552664730-d307ca884978"), u("photo-1553877522-43269d4ea984")],
  ["hybrid-cloud", u("photo-1451187580459-43490279c0fa"), u("photo-1558494949-ef010cbdcc31")],
  ["cloud-security", u("photo-1563986768609-322da13575f3"), u("photo-1555949963-ff9fe0c870eb")],
  ["app-modernization", u("photo-1461749280684-dccba630e2f6"), u("photo-1498050108023-c5249f4df085")],
  ["cloud-operations", u("photo-1558494949-ef010cbdcc31"), u("photo-1451187580459-43490279c0fa")],
  ["cloud-consulting", u("photo-1553877522-43269d4ea984"), u("photo-1522071820081-009f0129c71c")],
  ["cloud-migration", u("photo-1544197150-b99a580bb7a8"), u("photo-1558494949-ef010cbdcc31")],
  ["cloud-architecture", u("photo-1555949963-aa79dcee981c"), u("photo-1518770660439-4636190af475")],
  ["managed-cloud-services", u("photo-1454165804606-c3d57bc86b40"), u("photo-1460925895917-afdab827c52f")],
  ["devops-automation", u("photo-1618401471353-b98afee0b2eb"), u("photo-1555066931-4365d14bab8c")],
];

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { Accept: "image/jpeg,image/webp,image/*,*/*;q=0.8" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function toWebp(buf, destPath) {
  await sharp(buf)
    .resize(1600, 1000, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(destPath);
}

async function main() {
  safeMkdirSync(publicDir, outDir, { recursive: true });
  for (const [base, heroUrl, bodyUrl] of jobs) {
    const heroPath = safeJoin(outDir, `${base}.webp`);
    const bodyPath = safeJoin(outDir, `${base}-body.webp`);
    try {
      console.log("Fetching", base, "hero…");
      await toWebp(await downloadBuffer(heroUrl), heroPath);
      console.log("Fetching", base, "body…");
      await toWebp(await downloadBuffer(bodyUrl), bodyPath);
      console.log("OK", base);
    } catch {
      logScriptError(base);
      process.exitCode = 1;
    }
  }
}

main();
