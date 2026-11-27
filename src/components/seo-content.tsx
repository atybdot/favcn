import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { FAQ_ITEMS, FEATURES, HOW_TO_STEPS } from "@/lib/seo-content";

const TAB_LINKS = [
  { tab: "image", label: "image to favicon" },
  { tab: "emoji", label: "emoji favicon" },
  { tab: "text", label: "text favicon" },
  { tab: "shapes", label: "shape favicon" },
  { tab: "gradient", label: "gradient favicon" },
] as const;

export function SeoContent({ collapsed = false }: { collapsed?: boolean }) {
  const navigate = useNavigate({ from: "/" });
  const [isOpen, setIsOpen] = useState(!collapsed);

  // Collapse while the installation steps take over the page, expand again
  // once they are gone. The content stays in the DOM either way.
  useEffect(() => {
    setIsOpen(!collapsed);
  }, [collapsed]);

  return (
    <section className="mt-20 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
      <details
        className="group/guide"
        open={isOpen}
        onToggle={(event) => setIsOpen(event.currentTarget.open)}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm text-foreground">favicon guide</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              steps, files and faq
            </span>
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-xs text-muted-foreground transition-transform group-open/guide:rotate-45"
          >
            +
          </span>
        </summary>

        <div className="space-y-14 pt-12">
          <div className="space-y-3">
            <h2 className="text-lg text-foreground">
              free favicon generator, no uploads, no account
            </h2>
            <p>
              favcn turns a logo, photo, emoji, a couple of letters, a shape, or a gradient into
              every icon file a browser or phone asks for. Everything runs on canvas inside this
              tab, so the source file never leaves your device. If all you have is a png, the same
              page works as a png to ico converter.
            </p>
            <p>
              The zip is plain icon files, so it works in any framework. favcn prints the exact
              snippet for Next.js App Router, Vite, Astro, and plain HTML, and a shadcn CLI command
              that installs a Favicon component. If the ICO is all you need, untick the bundle and
              take the single file.
            </p>
            <nav
              aria-label="Favicon types"
              className="flex flex-wrap gap-x-4 gap-y-2 pt-1 font-mono text-[11px]"
            >
              {TAB_LINKS.map((link) => (
                <button
                  key={link.tab}
                  type="button"
                  onClick={() => void navigate({ to: "/", search: { tab: link.tab } })}
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg text-foreground">how to create a favicon in four steps</h2>
            <ol className="space-y-3">
              {HOW_TO_STEPS.map((step, index) => (
                <li key={step.name} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-[10px] text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="text-foreground">{step.name}.</span> {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg text-foreground">what you get</h2>
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="space-y-1">
                  <dt className="text-foreground">{feature.title}</dt>
                  <dd className="text-xs leading-relaxed">{feature.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg text-foreground">favicon generator faq</h2>
            <div className="divide-y divide-border border-y border-border">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-3">
                  <summary className="cursor-pointer list-none text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {item.question}
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 pr-6 text-xs leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}
