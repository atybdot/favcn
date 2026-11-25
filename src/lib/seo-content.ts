export const FAQ_ITEMS = [
  {
    question: "What is favcn?",
    answer:
      "favcn is a free favicon generator that runs in your browser. Start with an image, emoji, text, shape or gradient, and it builds favicon.ico, the png sizes, an apple touch icon, android icons and a web manifest. No account, no upload, no server.",
  },
  {
    question: "What is a favicon generator?",
    answer:
      "A favicon generator turns something you already have, like a logo or an emoji, into the icon files browsers and phones request. favcn renders favicon.ico, the png sizes, an apple touch icon, android icons, and site.webmanifest in a single download.",
  },
  {
    question: "Is favcn free to use?",
    answer:
      "Yes. favcn needs no account and there is no download limit. Every icon renders in your browser, so there is nothing to bill for.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "No. favcn draws everything with the canvas api inside your browser, so your image never leaves your device.",
  },
  {
    question: "Can I make a favicon from an emoji?",
    answer:
      "Yes. Open the emoji tab, choose one, and download. favcn renders it into the ICO and every png size in the bundle, up to the 512px android icon.",
  },
  {
    question: "Can I make a favicon from text?",
    answer:
      "Yes. Open the text tab, type one to three characters, then pick a font and the glyph colour. The background is optional, and the icon stays transparent without one. Geist, system, serif, mono and pixel fonts are all available.",
  },
  {
    question: "Which files does the favicon bundle include?",
    answer:
      "The zip contains favicon.ico with 16, 32 and 48px frames, the same three sizes as standalone pngs, a 180px apple touch icon, 192 and 512px android icons, and site.webmanifest.",
  },
  {
    question: "Does favcn work with Next.js, React, Svelte, Astro, and shadcn/ui?",
    answer:
      "Yes. The bundle is plain icon files and link tags, so it drops into any of them. favcn prints snippets for Next.js App Router, Vite, Astro, and plain HTML, plus a shadcn CLI command that installs a Favicon component for you.",
  },
] as const;

export const HOW_TO_STEPS = [
  {
    name: "Choose a source",
    text: "Drop an image, pick an emoji, type a few letters, or start from a shape or gradient. Your own browser tab shows the result live.",
  },
  {
    name: "Download the icons",
    text: "Take the zip with the ICO, the png sizes, the apple touch and android icons, and the manifest. Or untick the bundle and download the ICO alone.",
  },
  {
    name: "Add the files to your project",
    text: "Unzip the icons into your public folder, then add the tags favcn prints. Snippets cover Next.js App Router, Vite, Astro, and plain HTML.",
  },
  {
    name: "Or run the shadcn CLI",
    text: "In a shadcn/ui project, run the printed command instead. It installs a Favicon component that adds the tags for you.",
  },
] as const;

export const FEATURES = [
  {
    title: "image to favicon",
    text: "Drop a png, jpg, svg, or webp. favcn keeps any transparency on the way down to 16px.",
  },
  {
    title: "emoji favicon",
    text: "Pick any emoji and it renders at every size, ICO and 512px android icon included.",
  },
  {
    title: "text favicon",
    text: "Type one to three characters, choose a font and weight, and pick the glyph colour. Leave the background off and the icon stays transparent. The font list includes Geist pixel fonts.",
  },
  {
    title: "shapes and gradients",
    text: "Start from a geometric shape or a gradient when there is no logo yet.",
  },
  {
    title: "one complete bundle",
    text: "Get favicon.ico with 16, 32 and 48px frames, matching pngs, a 180px apple touch icon, android icons at 192 and 512px, and site.webmanifest in one zip.",
  },
  {
    title: "nothing leaves your device",
    text: "Rendering happens on canvas, on your machine. No file ever touches a server, and there is no account to create.",
  },
] as const;
