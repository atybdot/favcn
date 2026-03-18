import { useEffect } from "react";
import { inject } from "@vercel/analytics";
import { Toaster } from "@favicon/ui/components/sonner";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import appCss from "../index.css?url";
import { ThemeProvider } from "../components/theme-provider";
import { Favicon } from "@/components/favicon";

export interface RouterAppContext {}

const SEO_SCRIPT = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "favcn - Free Favicon Generator",
      "alternateName": "favcn",
      "description": "Generate pixel-perfect favicons and app icons from images, emojis, text, shapes, and gradients. 100% free, 100% client-side. Supports React, Vue, Svelte, Next.js, shadcn/ui and all frameworks.",
      "url": "https://favcn.atyb.me",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "atyb",
        "url": "https://atyb.me"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a favicon generator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A favicon generator is a free online tool that creates favicons (small icons) for websites. favcn lets you convert images, emojis, text, shapes, and gradients into production-ready favicon packages including ICO, PNG, Apple Touch Icon, and Android Chrome icons."
          }
        },
        {
          "@type": "Question",
          "name": "Is favcn completely free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! favcn is 100% free to use. No registration required, no hidden fees. All favicon conversions happen locally in your browser - your images never leave your device."
          }
        },
        {
          "@type": "Question",
          "name": "How do I create a favicon from an emoji?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply select the 'emoji' mode in favcn, choose your favorite emoji, customize colors if needed, and download your favicon. The emoji is converted to a crisp PNG icon in multiple sizes."
          }
        },
        {
          "@type": "Question",
          "name": "Can I create a text favicon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Select the 'text' mode, enter 1-3 characters, choose a font, and customize colors. Your text is rendered as a professional favicon with transparent background."
          }
        },
        {
          "@type": "Question",
          "name": "What formats does favcn output?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "favcn generates a complete SEO bundle including: favicon.ico, PNG icons (16x16, 32x32, 48x48), Apple Touch Icon (180x180), Android Chrome icons (192x192, 512x512), and site.webmanifest for PWA support."
          }
        },
        {
          "@type": "Question",
          "name": "Does favcn work for shadcn/ui projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! favcn includes one-click installation with shadcn CLI. Just copy the generated CLI command and run it in your shadcn project to automatically configure your favicon assets."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://favcn.atyb.me"
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to install your favicon",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Generate and download the favicon bundle",
          "text": "Create your favicon using favcn and download the ZIP bundle containing all required icon sizes including ICO, PNG, Apple Touch, and Android icons.",
          "url": "https://favcn.atyb.me"
        },
        {
          "@type": "HowToStep",
          "name": "Extract files to your project",
          "text": "Extract the ZIP file and copy all files to your project's public or static folder.",
          "url": "https://favcn.atyb.me"
        },
        {
          "@type": "HowToStep",
          "name": "Add HTML meta tags",
          "text": "Add the provided HTML code to the <head> section of your website. favcn generates this automatically.",
          "url": "https://favcn.atyb.me"
        },
        {
          "@type": "HowToStep",
          "name": "For shadcn/ui projects - run CLI",
          "text": "If you're using shadcn/ui, you can also run the generated shadcn CLI command to automatically install and configure your favicon assets.",
          "url": "https://favcn.atyb.me"
        }
      ]
    }
  ]
}`;

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "favcn - Free Favicon Generator | Create Favicons from Image, Emoji, Text",
      },
      {
        name: "google-site-verification",
        content: "tScB5dspOXOEsV-TcnLLoiZBlttZQThCHxWLj7lKrgw",
      },
      {
        name: "description",
        content:
          "Free online favicon generator - create favicons from PNG, SVG, emojis, text, shapes & gradients. 100% client-side, no uploads. Supports shadcn, Next.js, Vue, Svelte, Tailwind. Download SEO-optimized icon packages instantly.",
      },
      {
        property: "og:title",
        content: "favcn - Free Favicon Generator | Create Favicons from Image, Emoji, Text",
      },
      {
        property: "og:description",
        content:
          "Free online favicon generator - create favicons from PNG, SVG, emojis, text, shapes & gradients. 100% client-side. Supports shadcn, Next.js, Vue, Svelte.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://favcn.atyb.me" },
      { property: "og:image", content: "https://favcn.atyb.me/opengraph.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "favcn - Free Favicon Generator" },
      { property: "og:site_name", content: "favcn" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "favcn - Free Favicon Generator | Create Favicons from Image, Emoji, Text",
      },
      {
        name: "twitter:description",
        content:
          "Free favicon generator - create from PNG, emojis, text, shapes & gradients. 100% client-side. Supports shadcn, Next.js, Vue, Svelte.",
      },
      {
        name: "twitter:image",
        content: "https://favcn.atyb.me/opengraph.webp",
      },
      { name: "twitter:image:alt", content: "favcn - Free Favicon Generator" },
      { name: "twitter:creator", content: "@atybme" },
      { name: "theme-color", content: "#0a0a0a" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: "favcn" },
      { name: "creator", content: "atyb" },
      { name: "publisher", content: "favcn" },
      {
        name: "keywords",
        content:
          "favicon generator, free favicon generator, favicon maker, favicon creator, app icon generator, PNG to ICO, emoji favicon, text favicon, gradient favicon, favicon from image, favicon from emoji, favicon from text, favicon shapes, shadcn favicon, react favicon, vue favicon, svelte favicon, nextjs favicon, tailwind favicon, ico generator, apple touch icon, android icon, PWA icon, favicon converter, favicon online, favicon free, favicon no upload",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "favcn" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { name: "DC.language", content: "en" },
      { name: "DC.title", content: "favcn - Free Favicon Generator" },
      {
        name: "DC.description",
        content:
          "Generate favicons and app icons instantly. Create from PNG, emojis, text, shapes & gradients. 100% client-side.",
      },
      { name: "DC.creator", content: "atyb" },
      { name: "DC.publisher", content: "favcn" },
      { name: "referrer", content: "origin-when-cross-origin" },
    ],
    links: [
      { rel: "canonical", href: "https://favcn.atyb.me" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap",
      },
      { rel: "alternate", hreflang: "en", href: "https://favcn.atyb.me" },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://favcn.atyb.me",
      },
      { rel: "dns-prefetch", href: "https://favcn.atyb.me" },
      { rel: "prerender", href: "https://favcn.atyb.me" },
    ],
  }),

  component: RootDocument,
});

/**
 * Inline script injected into <head> to apply the saved theme class before
 * first paint, preventing a flash of unstyled content (FOUC).
 */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("favcn-theme");if(t==="light"||t==="dark"){document.documentElement.classList.add(t)}else{document.documentElement.classList.add(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")}}catch(e){document.documentElement.classList.add("dark")}})()`;

function RootDocument() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      void import("react-grab");
    } else {
      inject();
    }
  }, []);

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <Favicon />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: SEO_SCRIPT }} />
      </head>
      <body className="min-h-svh bg-background text-foreground">
        <ThemeProvider defaultTheme="dark" storageKey="favcn-theme">
          <Outlet />
          <Toaster richColors />
        </ThemeProvider>
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
