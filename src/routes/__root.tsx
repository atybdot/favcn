import { useEffect } from "react";
import { inject } from "@vercel/analytics";
import { Toaster } from "@/components/ui/sonner";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "../components/theme-provider";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_SOCIAL,
  SITE_TITLE,
  SITE_URL,
} from "../lib/site";
import { FAQ_ITEMS, HOW_TO_STEPS } from "../lib/seo-content";

export interface RouterAppContext {}

const PAGE_URL = `${SITE_URL}/`;

const SEO_SCRIPT = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
      sameAs: [SITE_AUTHOR.github, `https://x.com/${SITE_SOCIAL.x.slice(1)}`],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: PAGE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      alternateName: "favcn free favicon generator",
      url: PAGE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Favicon generator",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and HTML5 canvas support",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Generate favicons from images, emojis, text, shapes, and gradients",
        "Export favicon.ico, PNG, Apple Touch, and Android icons",
        "Generate a site.webmanifest and HTML link tags",
        "Run entirely in the browser without uploading files",
      ],
      screenshot: SITE_OG_IMAGE,
      author: { "@id": `${SITE_URL}/#author` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#howto`,
      name: "How to create and install a favicon",
      description: "Create a complete favicon set with favcn and add it to any website.",
      step: HOW_TO_STEPS.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
        url: PAGE_URL,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
});

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      {
        name: "google-site-verification",
        content: "tScB5dspOXOEsV-TcnLLoiZBlttZQThCHxWLj7lKrgw",
      },
      {
        name: "msvalidate.01",
        content: "3B4A506002687A989DE1099C28E8A38A",
      },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: SITE_KEYWORDS },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: SITE_NAME },
      { name: "creator", content: SITE_AUTHOR.name },
      { name: "publisher", content: SITE_NAME },
      { name: "application-name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: SITE_OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} free favicon generator` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_SOCIAL.x },
      { name: "twitter:creator", content: SITE_SOCIAL.x },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: SITE_OG_IMAGE },
      { name: "twitter:image:alt", content: `${SITE_NAME} free favicon generator` },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "color-scheme", content: "dark light" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
      { name: "DC.language", content: "en" },
      { name: "DC.title", content: SITE_TITLE },
      { name: "DC.description", content: SITE_DESCRIPTION },
      { name: "DC.creator", content: SITE_AUTHOR.name },
      { name: "DC.publisher", content: SITE_NAME },
      { name: "referrer", content: "origin-when-cross-origin" },
    ],
    links: [
      { rel: "canonical", href: PAGE_URL },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap",
      },
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
