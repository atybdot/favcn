import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { TAB_REDIRECTS } from "@/lib/generator-tabs";

/**
 * Keyword URLs are aliases for the home page. They send the visitor to the
 * matching generator tab instead of rendering a second page.
 */
export const Route = createFileRoute("/$slug")({
  beforeLoad: ({ params }) => {
    const tab = TAB_REDIRECTS[params.slug];

    if (!tab) {
      throw notFound();
    }

    throw redirect({
      to: "/",
      search: { tab },
      statusCode: 301,
    });
  },
});
