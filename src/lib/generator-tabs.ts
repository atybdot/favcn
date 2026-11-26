export const GENERATOR_TAB_VALUES = ["image", "emoji", "text", "shapes", "gradient"] as const;

export type GeneratorTab = (typeof GENERATOR_TAB_VALUES)[number];

const TAB_ALIASES: Record<string, GeneratorTab> = {
  image: "image",
  file: "image",
  upload: "image",
  png: "image",
  ico: "image",
  emoji: "emoji",
  text: "text",
  letter: "text",
  letters: "text",
  shapes: "shapes",
  shape: "shapes",
  gradient: "gradient",
  color: "gradient",
  colors: "gradient",
  colour: "gradient",
  colours: "gradient",
};

export function parseGeneratorTab(input: unknown): GeneratorTab | undefined {
  if (typeof input !== "string") return undefined;
  return TAB_ALIASES[input.toLowerCase()] ?? undefined;
}

/**
 * Keyword URLs that send visitors to the matching tab on the single page.
 * They are aliases, not separate pages, so the canonical stays `/`.
 *
 * Keep the head terms (`/favicon-generator`, `/favicon-maker`) out of this
 * map. Those belong to the home page itself.
 */
export const TAB_REDIRECTS: Record<string, GeneratorTab> = {
  "emoji-favicon-generator": "emoji",
  "emoji-favicon": "emoji",
  "emoji-to-ico": "emoji",
  "text-favicon-generator": "text",
  "text-favicon": "text",
  "letter-favicon": "text",
  "initials-favicon": "text",
  "png-to-ico": "image",
  "png-to-favicon": "image",
  "svg-to-ico": "image",
  "image-to-favicon": "image",
  "ico-converter": "image",
  "favicon-converter": "image",
  "pwa-icon-generator": "image",
  "web-manifest-generator": "image",
  "apple-touch-icon-generator": "image",
  "android-icon-generator": "image",
  "favicon-for-nextjs": "image",
  "nextjs-favicon": "image",
  "favicon-for-react": "image",
  "react-favicon": "image",
  "svelte-favicon": "image",
  "vue-favicon": "image",
  "astro-favicon": "image",
  "tailwind-favicon": "image",
  "shadcn-favicon": "image",
  "shape-favicon-generator": "shapes",
  "gradient-favicon-generator": "gradient",
  alternatives: "image",
};
