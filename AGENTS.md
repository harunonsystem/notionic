# AGENTS.md - Notionic Project Guidelines

## Build/Lint/Test Commands

Using [Bun](https://bun.sh/) for package management and scripts.

- Build: `next build`
- Lint: `biome check components/ pages/ lib/ && biome format components/ pages/ lib/ --write`
- Test all: `vitest run`
- Single test: `vitest run <file>` (e.g., `vitest run ThemeSwither.test.tsx`)
- Typecheck: `tsc --noEmit`
- Full check: `bun run check` (lint + typecheck + format + test)
- Dev: `next dev` | Start: `next start`

## Code Style Guidelines

- **Imports**: Absolute paths with `@/` alias (e.g., `import { Foo } from '@/components/Foo'`)
- **Formatting**: Single quotes, no semicolons, 2-space indentation, trailing commas none (Biome)
- **Types**: TypeScript with strict: false; use .ts/.tsx extensions
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch; log errors appropriately
- **Linting**: Biome for linting/formatting; ESLint for Next.js core-web-vitals
- **Testing**: Vitest with happy-dom environment; globals enabled; setup in setupTests.ts
