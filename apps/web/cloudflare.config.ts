import { defineWorker } from "@cloudflare/vite-plugin/experimental-config";

/**
 * Cloudflare Worker project configuration.
 *
 * This replaces `wrangler.jsonc`. The Vite plugin reads it during dev and
 * build, and `wrangler deploy` uses the generated output in `dist/`.
 *
 * `cloudflare.config.ts` is loaded by Node.js, not Bun, so the app scripts
 * invoke Vite through `node` explicitly.
 */
export default defineWorker({
  name: "favcn-mono",
  entrypoint: "@tanstack/react-start/server-entry",
  compatibilityDate: "2026-06-06",
  compatibilityFlags: ["nodejs_compat"],
  observability: {
    enabled: true,
  },
  domains: ["favcn.atyb.dev"],
});
