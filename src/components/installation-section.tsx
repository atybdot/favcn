import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE_URL } from "@/lib/site";
import { CodeBlockCommand, convertNpmCommand } from "./code-block-command";
import { CodeBlock } from "./code-block";

// ---------------------------------------------------------------------------
// Registry base URL
// ---------------------------------------------------------------------------

const REGISTRY_BASE = `${SITE_URL}/registry`;

// ---------------------------------------------------------------------------
// Static HTML code — deterministic based on bundle flag
// ---------------------------------------------------------------------------

const HTML_CODE_BUNDLE = `<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`;

const HTML_CODE_ICO = `<link rel="icon" href="/favicon.ico" sizes="48x48" />`;

// ---------------------------------------------------------------------------
// Code snippet helpers
// ---------------------------------------------------------------------------

function getNextJsCode(isBundle: boolean): string {
  if (isBundle) {
    return `// app/layout.tsx (App Router)
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};`;
  }
  return `// app/layout.tsx (App Router)
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
    ],
  },
};`;
}

function getAstroCode(htmlCode: string): string {
  const indented = htmlCode
    .split("\n")
    .map((l) => `    ${l}`)
    .join("\n");
  return `---
// src/layouts/Layout.astro
---

<html>
  <head>
${indented}
  </head>
  <body>
    <slot />
  </body>
</html>`;
}

function getHtmlDocCode(htmlCode: string): string {
  const indented = htmlCode
    .split("\n")
    .map((l) => `    ${l}`)
    .join("\n");
  return `<!doctype html>
<html>
  <head>
${indented}
  </head>
  <body>
    <!-- your content -->
  </body>
</html>`;
}

// ---------------------------------------------------------------------------
// Inline code tag helper
// ---------------------------------------------------------------------------

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 text-[11px] text-foreground">{children}</code>
  );
}

// ---------------------------------------------------------------------------
// InstallationSection — Automatic / Manual tabs with dynamic content
// ---------------------------------------------------------------------------

export function InstallationSection({ isBundle }: { isBundle: boolean }) {
  const htmlCode = isBundle ? HTML_CODE_BUNDLE : HTML_CODE_ICO;

  const registryUrl = isBundle
    ? `${REGISTRY_BASE}/favicon-bundle.json`
    : `${REGISTRY_BASE}/favicon-ico.json`;

  const shadcnCommand = `npx shadcn@latest add ${registryUrl}`;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Installation</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {isBundle ? (
            <>
              extract the zip into your <Code>public</Code> folder, then add the link tags to your
              document head.
            </>
          ) : (
            <>
              place <Code>favicon.ico</Code> in your <Code>public</Code> folder, then add the link
              tag to your document head.
            </>
          )}
        </p>
      </div>

      {/* -- Automatic -- */}
      <div className="space-y-4 mt-4">
        <h3 className="text-sm font-medium">Automatic</h3>
        <p className="text-xs text-muted-foreground">
          run the command to add a <Code>{"<Favicon />"}</Code> component to your project:
        </p>

        <CodeBlockCommand {...convertNpmCommand(shadcnCommand)} />

        <p className="text-xs leading-relaxed text-muted-foreground">
          then use the component in your root layout:
        </p>
        <CodeBlock
          code={`import { Favicon } from "@/components/favicon"

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Favicon />
      </head>
      <body>{children}</body>
    </html>
  )
}`}
        />
      </div>

      {/* -- Manual -- */}
      <div className="space-y-4 mt-4">
        <h3 className="text-sm font-medium">Manual</h3>
        <Tabs defaultValue="nextjs" className="w-full">
          <TabsList variant="line" className="mb-3">
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
            <TabsTrigger value="vite">Vite</TabsTrigger>
            <TabsTrigger value="astro">Astro</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>

          {/* Next.js */}
          <TabsContent value="nextjs" className="space-y-3">
            <p className="text-xs text-muted-foreground">
              add the metadata export to your root <Code>app/layout.tsx</Code>:
            </p>
            <CodeBlock code={getNextJsCode(isBundle)} />
          </TabsContent>

          {/* Vite */}
          <TabsContent value="vite" className="space-y-3">
            <p className="text-xs text-muted-foreground">
              add {isBundle ? "these tags" : "this tag"} inside the <Code>{"<head>"}</Code> of your{" "}
              <Code>index.html</Code>:
            </p>
            <CodeBlock code={htmlCode} />
            <p className="text-xs text-muted-foreground">
              ensure {isBundle ? "all favicon files are" : "the favicon file is"} in the{" "}
              <Code>public</Code> directory.
            </p>
          </TabsContent>

          {/* Astro */}
          <TabsContent value="astro" className="space-y-3">
            <p className="text-xs text-muted-foreground">
              add the links to your <Code>Layout.astro</Code> head:
            </p>
            <CodeBlock code={getAstroCode(htmlCode)} />
          </TabsContent>

          {/* Vanilla HTML */}
          <TabsContent value="html" className="space-y-3">
            <p className="text-xs text-muted-foreground">
              add {isBundle ? "these tags" : "this tag"} inside the <Code>{"<head>"}</Code> of your
              HTML file:
            </p>
            <CodeBlock lang="html" code={getHtmlDocCode(htmlCode)} />
          </TabsContent>
        </Tabs>
      </div>

      {/* -- Quick reference -- */}
      <div className="mt-2 rounded-md border border-border bg-muted/20 p-4">
        <h3 className="mb-2 text-xs font-medium">
          {isBundle ? "files in the bundle:" : "your download:"}
        </h3>
        {isBundle ? (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <li>
              <code className="text-foreground">favicon.ico</code>: tabs and bookmarks
            </li>
            <li>
              <code className="text-foreground">favicon-16x16.png</code>: 16px png fallback
            </li>
            <li>
              <code className="text-foreground">favicon-32x32.png</code>: 32px png fallback
            </li>
            <li>
              <code className="text-foreground">favicon-48x48.png</code>: google search results
            </li>
            <li>
              <code className="text-foreground">apple-touch-icon.png</code>: ios home screen
            </li>
            <li>
              <code className="text-foreground">android-chrome-*.png</code>: android home screens
            </li>
            <li>
              <code className="text-foreground">site.webmanifest</code>: pwa manifest
            </li>
          </ul>
        ) : (
          <ul className="text-[11px] text-muted-foreground">
            <li>
              <code className="text-foreground">favicon.ico</code>: 16, 32 and 48px frames in one
              file
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
