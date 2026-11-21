export const FAQ_ITEMS = [
  {
    question: "What is a favicon generator?",
    answer:
      "A favicon generator turns a logo, image, emoji, or a few letters into the icon files browsers show in tabs, bookmarks, and phone home screens. favcn creates every size browsers ask for and puts them in one download.",
  },
  {
    question: "Is favcn free to use?",
    answer:
      "Yes. favcn is free, needs no account, and has no download limits. Every icon is generated in your browser.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "No. favcn runs entirely in your browser with the HTML5 canvas API, so your image never leaves your device.",
  },
  {
    question: "Can I make a favicon from an emoji?",
    answer:
      "Yes. Pick the emoji tab, choose an emoji, and download. favcn renders it to crisp PNG sizes and an ICO file.",
  },
  {
    question: "Can I make a favicon from text?",
    answer:
      "Yes. Pick the text tab, type one to three characters, choose a font and colours, and favcn renders a transparent favicon.",
  },
  {
    question: "Which files does the favicon bundle include?",
    answer:
      "The bundle contains favicon.ico with 16, 32, and 48 pixel frames, standalone 16, 32, and 48 pixel PNGs, a 180 pixel Apple Touch icon, 192 and 512 pixel Android icons, and a site.webmanifest.",
  },
  {
    question: "Does favcn work with Next.js, React, Svelte, Astro, and shadcn/ui?",
    answer:
      "Yes. Download the bundle or copy the generated shadcn CLI command. favcn also prints the exact link tags and framework snippets for Next.js App Router, Astro, and plain HTML.",
  },
] as const;

export const HOW_TO_STEPS = [
  {
    name: "Choose a source",
    text: "Drop an image, pick an emoji, type a few letters, or start from a shape or gradient.",
  },
  {
    name: "Generate the bundle",
    text: "Download the ZIP bundle with the ICO, PNG, Apple Touch, and Android icons, or grab just the ICO.",
  },
  {
    name: "Add the files to your project",
    text: "Copy the icons into your public folder and paste the generated link tags into your document head.",
  },
  {
    name: "Or run the shadcn CLI",
    text: "In a shadcn/ui project, run the generated command to install a Favicon component that adds the tags for you.",
  },
] as const;

export const FEATURES = [
  {
    title: "image to favicon",
    text: "Drop a PNG, JPEG, SVG, or WebP file. favcn keeps the transparency and downscales it cleanly.",
  },
  {
    title: "emoji favicon",
    text: "Pick any emoji and export it as a sharp icon in every size a browser or phone asks for.",
  },
  {
    title: "text favicon",
    text: "Type one to three characters, choose a font, and set the background and glyph colours.",
  },
  {
    title: "shapes and gradients",
    text: "Start from a geometric shape or a gradient when you do not have a logo ready.",
  },
  {
    title: "one complete bundle",
    text: "Get favicon.ico, PNG variants, Apple Touch, Android Chrome icons, and a web manifest in a single ZIP.",
  },
  {
    title: "nothing leaves your device",
    text: "All rendering happens in the browser with canvas. No uploads, no accounts, no tracking of your files.",
  },
] as const;
