/**
 * Canonical production URL and shared SEO copy.
 *
 * Keep this file dependency-free: it is imported by `vite.config.ts` at build
 * time (for the sitemap host) and by client/server components at runtime.
 *
 * When deploying under a sub-path (for example `https://atyb.dev/favcn`),
 * update `SITE_URL` here and the matching `base`/`basepath` options in
 * `vite.config.ts` and `router.tsx`.
 */
export const SITE_URL = "https://favcn.atyb.dev";

export const SITE_NAME = "favcn";

export const SITE_TITLE = "Free Favicon Generator: ICO, PNG, Emoji & Text | favcn";

export const SITE_DESCRIPTION =
  "Create a favicon from an image, emoji, text, shape or gradient. Free, private and 100% in-browser. Export ICO, PNG, Apple Touch and Android icons in one click.";

export const SITE_KEYWORDS = [
  "favicon generator",
  "free favicon generator",
  "favicon maker",
  "favicon creator",
  "favicon from image",
  "emoji favicon",
  "text favicon",
  "gradient favicon",
  "shape favicon",
  "png to ico",
  "ico converter",
  "apple touch icon generator",
  "android icon generator",
  "pwa icon generator",
  "favicon generator no upload",
].join(", ");

export const SITE_AUTHOR = {
  name: "atyb",
  url: "https://atyb.me",
  github: "https://github.com/atybdot",
} as const;

export const SITE_SOCIAL = {
  x: "@atybdot",
  github: "https://github.com/atybdot/favcn",
} as const;

export const SITE_OG_IMAGE = `${SITE_URL}/opengraph.png`;
