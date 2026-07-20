import { isKnownSpaRoute, shouldSkipSpaCheck } from "./spaRouteAllowlist.js";

/**
 * Unknown SPA paths: rewrite to "/" so Vite serves the app shell, but keep
 * HTTP status 404. Mirrors Hostinger ErrorDocument behavior.
 *
 * Intentionally does not call fs / path APIs (avoids CWE-22 SAST findings on
 * variable file paths). Vite/sirv own the index.html read.
 */
export function spaAllowlist404Plugin() {
  return {
    name: "spa-allowlist-404",
    configureServer(server) {
      // Run early so we can rewrite before Vite's HTML fallback
      server.middlewares.use((req, res, next) => {
        forceSpa404(req, res, next, "/");
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        // Preview static server: serve the built index via root URL
        forceSpa404(req, res, next, "/");
      });
    },
  };
}

/**
 * If the request is an unknown HTML navigation, pin status to 404 and rewrite
 * the URL so the next middleware serves the SPA entry.
 */
function forceSpa404(req, res, next, spaEntryUrl) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    next();
    return;
  }

  const url = req.url || "/";
  if (shouldSkipSpaCheck(url) || isKnownSpaRoute(url)) {
    next();
    return;
  }

  const accept = req.headers.accept || "";
  const wantsHtml =
    accept.includes("text/html") || accept.includes("*/*") || !accept;

  if (!wantsHtml) {
    res.statusCode = 404;
    res.setHeader("Cache-Control", "no-store");
    res.end("Not Found");
    return;
  }

  // Keep 404 even if a later middleware tries to set 2xx
  pinResponseStatus404(res);
  res.setHeader("Cache-Control", "no-store");
  req.url = spaEntryUrl;
  next();
}

function pinResponseStatus404(res) {
  let status = 404;
  res.statusCode = 404;

  const originalWriteHead = res.writeHead.bind(res);
  res.writeHead = (code, ...rest) => {
    const nextCode =
      typeof code === "number" && code >= 200 && code < 300 ? 404 : code;
    status = typeof nextCode === "number" ? nextCode : status;
    return originalWriteHead(nextCode, ...rest);
  };

  try {
    Object.defineProperty(res, "statusCode", {
      configurable: true,
      enumerable: true,
      get() {
        return status;
      },
      set(value) {
        status =
          typeof value === "number" && value >= 200 && value < 300 ? 404 : value;
      },
    });
  } catch {
    // Some environments may not allow redefining statusCode; writeHead hook remains.
    res.statusCode = 404;
  }
}
