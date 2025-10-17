# AGENTS.md - Notionic Project Guidelines

## Build/Lint/Test Commands

using [Bun](https://bun.sh/) for package management and scripts.

- Build: `next build`
- Lint: `next lint`
- Format: `prettier --write .`
- Test all: `vitest`
- Test UI: `vitest --ui`
- Single test: `vitest run <file>` (e.g., `vitest run ThemeSwither.test.tsx`)
- Dev: `next dev`
- Start: `next start`

## Code Style Guidelines

- **Imports**: Use absolute paths with `@/` alias (e.g., `import { Foo } from '@/components/Foo'`)
- **Formatting**: Prettier with single quotes, no semicolons, 2-space tabs, trailing comma none
- **Types**: TypeScript with strict: false; use .ts/.tsx extensions
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch; log errors appropriately
- **Linting**: ESLint with Next.js core-web-vitals rules
- **Testing**: Vitest with jsdom; globals enabled; setup in setupTests.ts
