import fs from "node:fs";
import path from "node:path";
import { isKnownSpaRoute, shouldSkipSpaCheck } from "./spaRouteAllowlist.js";
import { assertWithin, safeJoin } from "./scripts/path-safe.mjs";

/**
 * Serve index.html with HTTP 404 for unknown SPA paths (dev + preview).
 * Mirrors Hostinger .htaccess allowlist behavior.
 *
 * CWE-22: index.html is resolved only via safeJoin under Vite's project root —
 * never path.join with request-derived segments.
 */
export function spaAllowlist404Plugin() {
  return {
    name: "spa-allowlist-404",
    configureServer(server) {
      const projectRoot = server.config.root;
      server.middlewares.use(async (req, res, next) => {
        try {
          await handleUnknownSpa(req, res, next, {
            projectRoot,
            transformIndexHtml: (url, html) =>
              server.transformIndexHtml(url, html),
            // Fixed relative segments only (literals)
            indexSegments: ["index.html"],
          });
        } catch (err) {
          next(err);
        }
      });
    },
    configurePreviewServer(server) {
      const projectRoot = server.config.root;
      server.middlewares.use(async (req, res, next) => {
        try {
          await handleUnknownSpa(req, res, next, {
            projectRoot,
            transformIndexHtml: async (_url, html) => html,
            indexSegments: ["dist", "index.html"],
          });
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

/**
 * Resolve the SPA shell path under projectRoot using allowlisted basenames only.
 * @param {string} projectRoot
 * @param {string[]} indexSegments e.g. ["index.html"] or ["dist","index.html"]
 */
function resolveShellHtml(projectRoot, indexSegments) {
  if (typeof projectRoot !== "string" || !path.isAbsolute(projectRoot)) {
    throw new Error("Invalid project root");
  }
  if (!Array.isArray(indexSegments) || indexSegments.length === 0) {
    throw new Error("Invalid index segments");
  }
  // safeJoin rejects "..", separators, and enforces containment under projectRoot
  const file = safeJoin(projectRoot, ...indexSegments);
  assertWithin(projectRoot, file);
  if (path.basename(file) !== "index.html") {
    throw new Error("Shell file must be index.html");
  }
  return file;
}

async function handleUnknownSpa(
  req,
  res,
  next,
  { projectRoot, transformIndexHtml, indexSegments }
) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  const url = req.url || "/";
  if (shouldSkipSpaCheck(url)) {
    return next();
  }
  if (isKnownSpaRoute(url)) {
    return next();
  }

  const accept = req.headers.accept || "";
  if (accept.includes("text/html") || accept.includes("*/*") || !accept) {
    let file;
    try {
      file = resolveShellHtml(projectRoot, indexSegments);
    } catch {
      return next();
    }
    if (!fs.existsSync(file)) {
      return next();
    }
    const raw = fs.readFileSync(file, "utf-8");
    const html = await transformIndexHtml("/", raw);
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(html);
    return;
  }

  res.statusCode = 404;
  res.end("Not Found");
}
