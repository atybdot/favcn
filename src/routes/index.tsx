import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Generator } from "../components/generator";
import { SeoContent } from "../components/seo-content";
import Footer from "@/components/footer";
import { parseGeneratorTab, type GeneratorTab } from "@/lib/generator-tabs";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { tab?: GeneratorTab } => {
    const tab = parseGeneratorTab(search.tab);
    return tab ? { tab } : {};
  },
  component: HomeComponent,
});

function HomeComponent() {
  // While the installation steps are on screen the long-form guide folds
  // itself away; it never leaves the DOM, so the copy stays crawlable.
  const [hasSource, setHasSource] = useState(false);

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col px-6 pt-16 md:pt-24">
      <Generator onSourceChange={setHasSource} />
      <SeoContent collapsed={hasSource} />
      <Footer />
    </main>
  );
}
