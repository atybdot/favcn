import { createFileRoute } from "@tanstack/react-router";
import { Generator } from "../components/generator";
import { SeoContent } from "../components/seo-content";
import Footer from "@/components/footer";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col px-6 pt-16 md:pt-24">
      <Generator />
      <SeoContent />
      <Footer />
    </main>
  );
}
