/**
 * Convert site videos to GIF. Uses ffmpeg-static (no global ffmpeg needed).
 * Run from frontend: npm run videos:to-gif
 *
 * All FS access is jailed under public/ via path-safe gated APIs (CWE-22).
 */
import { spawn } from "child_process";
import ffmpegStatic from "ffmpeg-static";
import {
  assertWithin,
  safeJoin,
  safeMkdirSync,
  safeExistsSync,
  publicDirFromScript,
  logScriptError,
} from "./path-safe.mjs";

const PUBLIC = publicDirFromScript(import.meta.url);
const VIDEOS_DIR = safeJoin(PUBLIC, "videos");

const TASKS = [
  {
    name: "About page background",
    src: safeJoin(PUBLIC, "videos", "aboutpage.mp4"),
    dest: safeJoin(PUBLIC, "videos", "aboutpage.gif"),
    vf: "fps=15,scale=800:-1:flags=lanczos",
  },
  {
    name: "AI logo animation",
    src: safeJoin(PUBLIC, "ai-logo-animation.webm"),
    dest: safeJoin(PUBLIC, "ai-logo-animation.gif"),
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
  safeMkdirSync(PUBLIC, VIDEOS_DIR, { recursive: true });
  let done = 0;
  for (const { name, src, dest, vf } of TASKS) {
    if (!safeExistsSync(PUBLIC, src)) {
      console.warn(`Skip ${name}: source not found`);
      continue;
    }
    try {
      await runFfmpeg(src, dest, vf);
      console.log(`OK ${name}`);
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
