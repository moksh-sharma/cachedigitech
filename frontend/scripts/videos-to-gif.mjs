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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");
const VIDEOS_DIR = path.join(PUBLIC, "videos");

const TASKS = [
  {
    name: "About page background",
    src: path.join(VIDEOS_DIR, "aboutpage.mp4"),
    dest: path.join(VIDEOS_DIR, "aboutpage.gif"),
    vf: "fps=15,scale=800:-1:flags=lanczos",
  },
  {
    name: "AI logo animation",
    src: path.join(PUBLIC, "ai-logo-animation.webm"),
    dest: path.join(PUBLIC, "ai-logo-animation.gif"),
    vf: "fps=20,scale=480:-1:flags=lanczos",
  },
];

function runFfmpeg(src, dest, vf) {
  return new Promise((resolve, reject) => {
    const ffmpegPath = ffmpegStatic;
    if (!ffmpegPath) {
      reject(new Error("ffmpeg-static not installed. Run: npm install --save-dev ffmpeg-static"));
      return;
    }
    const args = ["-y", "-i", src, "-vf", vf, "-loop", "0", dest];
    const proc = spawn(ffmpegPath, args, { stdio: "pipe" });
    let stderr = "";
    proc.stderr?.on("data", (d) => { stderr += d.toString(); });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exit ${code}: ${stderr.slice(-500)}`));
    });
    proc.on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  let done = 0;
  for (const { name, src, dest, vf } of TASKS) {
    if (!fs.existsSync(src)) {
      console.warn(`Skip ${name}: source not found at ${path.relative(PUBLIC, src)}`);
      continue;
    }
    try {
      await runFfmpeg(src, dest, vf);
      console.log(`OK ${name} -> ${path.relative(PUBLIC, dest)}`);
      done++;
    } catch (err) {
      console.error(`${name}: ${err.message}`);
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
