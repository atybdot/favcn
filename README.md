# favcn

A favicon generator. Pick an image, emoji, text, shape or gradient, then export ICO, PNG, Apple Touch and Android icons. Everything runs in the browser; no file leaves the machine.

The page is prerendered at build time, so the first request returns the full markup and copy, not an empty shell.

## Stack

- React 19 with TanStack Start (file-based routing, SSR, prerendering)
- Tailwind CSS v4
- shadcn/ui primitives on Base UI
- Cloudflare Workers for hosting
- Vite 7
- pnpm as package manager
- Oxlint and Oxfmt for linting and formatting
- Husky for the pre-commit hook

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command            | What it does                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| `pnpm dev`         | Start the dev server                                                         |
| `pnpm build`       | Production build, prerender and sitemap                                      |
| `pnpm serve`       | Preview the production build                                                 |
| `pnpm deploy`      | Build, then deploy to Cloudflare Workers                                     |
| `pnpm cf-typegen`  | Regenerate `worker-configuration.d.ts` after changing `cloudflare.config.ts` |
| `pnpm check-types` | Run `tsc --noEmit`                                                           |
| `pnpm check`       | Lint and format every file                                                   |
| `pnpm format`      | Format only                                                                  |

## Layout

```
favcn/
├── public/                 # Static assets, fonts, exported icon registry
├── src/
│   ├── components/         # App components
│   │   └── ui/             # shadcn/ui primitives
│   ├── hooks/
│   ├── lib/                # Favicon rendering, gradients, SEO copy
│   ├── routes/             # TanStack Router file routes
│   ├── index.css           # Tailwind entry, design tokens, fonts
│   ├── router.tsx
│   └── routeTree.gen.ts    # Generated, do not edit
├── cloudflare.config.ts    # Worker name, entrypoint, domain
├── vite.config.ts
└── components.json         # shadcn config
```

## Adding UI components

```bash
pnpm dlx shadcn@latest add dialog
```

The CLI writes to `src/components/ui`. Import from there with the `@/` alias:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

Design tokens live in `src/index.css`.

## Deployment

`pnpm deploy` builds, then `wrangler` uploads the worker. The worker name and custom domain come from `cloudflare.config.ts`.
