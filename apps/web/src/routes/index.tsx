import { createFileRoute } from "@tanstack/react-router";
import { Generator } from "../components/generator";
import Footer from "@/components/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "favcn - Free Favicon Generator | Create Favicons from Image, Emoji, Text, Shapes, Gradients",
      },
      {
        name: "description",
        content:
          "Free online favicon generator - create pixel-perfect favicons from PNG, SVG, emojis, text, shapes & gradients. 100% client-side, no uploads. Supports shadcn, Next.js, Vue, Svelte, Tailwind. Download SEO-optimized icon packages instantly.",
      },
      {
        property: "og:title",
        content:
          "favcn - Free Favicon Generator | Create Favicons from Image, Emoji, Text, Shapes, Gradients",
      },
      {
        property: "og:description",
        content:
          "Free online favicon generator - create pixel-perfect favicons from PNG, emojis, text, shapes & gradients. 100% client-side.",
      },
      {
        name: "twitter:title",
        content:
          "favcn - Free Favicon Generator | Create Favicons from Image, Emoji, Text, Shapes, Gradients",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "keywords",
        content:
          "favicon generator, free favicon generator, favicon maker, favicon creator, app icon generator, PNG to ICO, emoji favicon, text favicon, gradient favicon, favicon from image, favicon from emoji, favicon from text, favicon shapes, shadcn favicon, react favicon, vue favicon, svelte favicon, nextjs favicon, tailwind favicon, ico generator, apple touch icon, android icon, PWA icon, favicon converter, favicon online, favicon free, favicon no upload",
      },
      { rel: "canonical", href: "https://favcn.atyb.me" },
    ],
  }),
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="mx-auto grid grid-rows-[1fr_auto] min-h-svh max-w-xl flex-col px-6 pt-16 md:pt-24">
      <Generator />
      <Footer />
    </main>
  );
}
