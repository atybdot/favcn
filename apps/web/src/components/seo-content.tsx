import { FAQ_ITEMS, FEATURES, HOW_TO_STEPS } from "@/lib/seo-content";

export function SeoContent() {
  return (
    <section className="mt-20 space-y-14 border-t border-border pt-12 text-sm leading-relaxed text-muted-foreground">
      <div className="space-y-3">
        <h2 className="text-lg text-foreground">free favicon generator, no uploads</h2>
        <p>
          favcn turns a logo, photo, emoji, a couple of letters, a shape, or a gradient into every
          icon a browser and phone needs. It is a favicon maker and a PNG to ICO converter in one
          page, and it runs entirely in your browser, so your source file never leaves your device.
        </p>
        <p>
          The generated bundle works with Next.js App Router, React, Vue, Svelte, Astro, plain HTML,
          and shadcn/ui. If you only need an ICO, turn off the SEO bundle and download the single
          file.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg text-foreground">how to create a favicon</h2>
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
    </section>
  );
}
