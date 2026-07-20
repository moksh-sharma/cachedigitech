import fs from "node:fs";
import path from "node:path";
import { isKnownSpaRoute, shouldSkipSpaCheck } from "./spaRouteAllowlist.js";

/**
 * Serve index.html with HTTP 404 for unknown SPA paths (dev + preview).
 * Mirrors Hostinger .htaccess allowlist behavior.
 */
export function spaAllowlist404Plugin() {
  return {
    name: "spa-allowlist-404",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          await handleUnknownSpa(req, res, next, {
            root: server.config.root,
            transformIndexHtml: (url, html) =>
              server.transformIndexHtml(url, html),
          });
        } catch (err) {
          next(err);
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          await handleUnknownSpa(req, res, next, {
            root: server.config.root,
            // preview: dist/index.html, no transform
            transformIndexHtml: async (_url, html) => html,
            indexFile: path.join(server.config.root, "dist", "index.html"),
          });
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

async function handleUnknownSpa(req, res, next, { root, transformIndexHtml, indexFile }) {
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

  // Accept: prefer HTML navigations; still 404 bare unknown paths
  const accept = req.headers.accept || "";
  if (accept.includes("text/html") || accept.includes("*/*") || !accept) {
    const file = indexFile || path.join(root, "index.html");
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
