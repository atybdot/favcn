# AGENTS.md - Developer Guide for This Project

## Project Overview

This is a monorepo using Turborepo with Bun as package manager. It contains:

- `apps/web` - Main web application (Vite + React + TanStack Start)
- `packages/ui` - Shared UI component library
- `packages/env` - Environment variables using @t3-oss/env-core + Zod
- `packages/config` - Shared configuration

## Build/Lint/Test Commands

### Root Commands (from monorepo root)

```bash
# Development
bun run dev                    # Run all packages in dev mode
bun run dev:web                # Run only web app in dev mode

# Build
bun run build                  # Build all packages

# Type checking
bun run check-types            # Type-check all packages (turbo check-types)

# Linting & Formatting
bun run check                  # Run oxlint AND oxfmt (fixes format)
```

### Package-specific Commands

```bash
# Web app (apps/web)
bun run dev                    # Vite dev server (port 3001)
bun run build                  # Vite build
bun run serve                  # Vite preview

# UI package (packages/ui)
bun run check-types            # TypeScript check only
```

### Single File/Component Development

```bash
# Run a specific package's dev server
bun run dev --filter=web       # or use bun run dev:web

# Format a single file with oxfmt
bunx oxfmt path/to/file.tsx
```

## Code Style Guidelines

### General Conventions

- **Package Manager**: Always use Bun (`bun install`, `bun add <package>`)
- **Module System**: ESM (`"type": "module"` in package.json)
- **Language**: TypeScript throughout

### Imports

```typescript
// Workspace packages (use @favicon/ prefix)
import { Button } from "@favicon/ui/components/button";
import { cn } from "@favicon/ui/lib/utils";
import { env } from "@favicon/env/web";

// External packages
import { createFileRoute } from "@tanstack/react-router";
import { clsx, type ClassValue } from "clsx";

// Relative imports for same-package files
import { Loader } from "./components/loader";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `HomeComponent`)
- **Files**: kebab-case for utilities, PascalCase for components (e.g., `utils.ts`, `button.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth`)
- **Constants**: UPPER_SNAKE_CASE for compile-time constants (e.g., `TITLE_TEXT`)

### Types

- Always use explicit return types for exported functions
- Use `type` for type aliases, `interface` for object shapes
- Prefer Zod for runtime validation (see `packages/env/src/web.ts`)

```typescript
// Good
function Button({ ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive {...props} />;
}

// Bad - missing types
function Button(props) { ... }
```

### Component Patterns

Use shadcn/ui-style patterns with CVA:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
});

function Button({ className, variant, size, ...props }: ButtonProps) {
  return <Primitive className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

### CSS/Tailwind

- Use Tailwind CSS v4 with `@tailwindcss/vite`
- Use `cn()` utility from `@favicon/ui/lib/utils` for conditional classes
- Avoid custom CSS unless necessary; use Tailwind utility classes

### Error Handling

- Use Zod schemas for environment variables and API responses
- Wrap async operations in try/catch where appropriate
- Use Error Boundaries for React component errors

### Linting & Formatting

- **oxlint** is configured at root (`.oxlintrc.json`)
- **oxfmt** formats code automatically
- **Pre-commit hooks**: Husky + lint-staged run `oxlint` and `oxfmt` on staged files

Run `bun run check` before committing to fix any issues.

### File Organization

```
apps/web/
├── src/
│   ├── components/     # Local components
│   ├── routes/         # TanStack Router file-based routes
│   ├── router.tsx      # Router configuration
│   └── router.tsx.gen  # Generated route tree
├── vite.config.ts
└── package.json

packages/ui/
├── src/
│   ├── components/     # Shared UI components
│   ├── lib/           # Utilities (cn, etc.)
│   ├── hooks/         # Shared hooks
│   └── styles/        # Global CSS
└── package.json
```

### Adding New Dependencies

```bash
# Add to specific workspace
bun add <package> -w packages/ui
bun add <package> -w apps/web

# Add to catalog (shared across workspaces)
# Edit package.json catalog section
```

### Adding New Components

Use shadcn patterns:

1. Create component in `packages/ui/src/components/`
2. Use CVA for variants
3. Export from component file
4. Re-export in main entry points if needed

## Key Technologies

- **React 19** with TypeScript
- **TanStack Start** (file-based routing)
- **Vite** for bundling
- **Tailwind CSS v4**
- **shadcn/ui** patterns
- **Zod** for validation
- **@t3-oss/env-core** for env types

## Environment Variables

Define in `packages/env/src/web.ts` using Zod schemas with @t3-oss/env-core.
