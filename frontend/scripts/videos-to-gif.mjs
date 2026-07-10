/**
 * Convert site videos to GIF. Uses ffmpeg-static (no global ffmpeg needed).
 *
 * 1. Place source files:
 *    - public/videos/aboutpage.mp4
 *    - public/ai-logo-animation.webm
 * 2. Run from frontend: npm run videos:to-gif
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ffmpegStatic from "ffmpeg-static";
import { assertWithin, logScriptError } from "./path-safe.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "..", "public");
const VIDEOS_DIR = path.resolve(PUBLIC, "videos");

const TASKS = [
  {
    name: "About page background",
    src: assertWithin(PUBLIC, path.join(VIDEOS_DIR, "aboutpage.mp4")),
    dest: assertWithin(PUBLIC, path.join(VIDEOS_DIR, "aboutpage.gif")),
    vf: "fps=15,scale=800:-1:flags=lanczos",
  },
  {
    name: "AI logo animation",
    src: assertWithin(PUBLIC, path.join(PUBLIC, "ai-logo-animation.webm")),
    dest: assertWithin(PUBLIC, path.join(PUBLIC, "ai-logo-animation.gif")),
    vf: "fps=20,scale=480:-1:flags=lanczos",
  },
];

function runFfmpeg(src, dest, vf) {
  return new Promise((resolve, reject) => {
    const ffmpegPath = ffmpegStatic;
    if (!ffmpegPath) {
      reject(new Error("ffmpeg-static not installed"));
      return;
    }
    const safeSrc = assertWithin(PUBLIC, src);
    const safeDest = assertWithin(PUBLIC, dest);
    const args = ["-y", "-i", safeSrc, "-vf", vf, "-loop", "0", safeDest];
    const proc = spawn(ffmpegPath, args, { stdio: "pipe" });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exit ${code}`));
    });
    proc.on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  let done = 0;
  for (const { name, src, dest, vf } of TASKS) {
    if (!fs.existsSync(src)) {
      console.warn(`Skip ${name}: source not found`);
      continue;
    }
    try {
      await runFfmpeg(src, dest, vf);
      console.log(`OK ${name} -> ${path.relative(PUBLIC, dest)}`);
      done++;
    } catch {
      logScriptError(name);
    }
  }
  if (done === 0) {
    console.log("\nNo conversions run. Add source files:");
    console.log("  public/videos/aboutpage.mp4");
    console.log("  public/ai-logo-animation.webm");
    console.log("Then run: npm run videos:to-gif");
  } else {
    console.log(`\nConverted ${done} video(s) to GIF.`);
  }
}

main();
