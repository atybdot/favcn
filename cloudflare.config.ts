import { defineWorker } from "@cloudflare/vite-plugin/experimental-config";

/**
 * Cloudflare Worker project configuration.
 *
 * This replaces `wrangler.jsonc`. The Vite plugin reads it during dev and
 * build, and `wrangler deploy` uses the generated output in `dist/`.
 *
 * Run it on Node. Bun cannot load this file.
 */
export default defineWorker({
  name: "favcn",
  entrypoint: "@tanstack/react-start/server-entry",
  compatibilityDate: "2026-06-06",
  compatibilityFlags: ["nodejs_compat"],
  observability: {
    enabled: true,
  },
  domains: ["favcn.atyb.dev"],
});
