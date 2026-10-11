# Rainbow UI

A framework-agnostic Web Components library built with Lit and TypeScript.

Rainbow is designed to work from plain HTML and server-rendered templates through React, Vue, Svelte, Solid, Angular, Astro, Next.js, Nuxt, Django, and HTMX.

## Development status

This repository is currently at the foundation stage. No production component API has been introduced yet.

## Requirements

- Node.js >= 22.18.0
- pnpm 10.15.1
- Git
- VS Code or Zed (optional)

## Start

```sh
corepack enable
corepack prepare pnpm@10.15.1 --activate
pnpm install
pnpm run setup:git-hooks
pnpm verify
pnpm dev
```

Development happens from `develop`. Do not commit to or push directly to `main`.

## Tooling

- TypeScript in strict mode
- Lit for Web Components
- Vite for library builds and development
- Vitest for tests
- Oxlint + tsgolint for linting, including type-aware rules
- Oxfmt for formatting
- VS Code and Zed project configuration
- Git hooks for branch, commit-message, formatting, linting, and type-check enforcement

## Git enforcement

The repository installs hooks into `.githooks` through `core.hooksPath`. Hooks enforce branch names, reject `main`, validate Conventional Commits, and run formatting/lint/type checks.

Local hooks are developer safeguards. The remote repository MUST additionally enable branch protection for `main`, require pull requests, require CI, and disallow force-pushes.

## Server-rendered applications

Rainbow does not require a JavaScript application framework. Django templates can emit Rainbow custom elements directly, and HTMX can swap Django-rendered fragments containing Rainbow elements. See [`docs/integrations/DJANGO_HTMX.md`](docs/integrations/DJANGO_HTMX.md).

The core package remains independent of Django and HTMX. Optional adapters may provide integration conveniences without changing the Web Component API.

## Architecture and support

- [`docs/architecture/INTEGRATION_MODEL.md`](docs/architecture/INTEGRATION_MODEL.md)
- [`docs/architecture/BROWSER_RUNTIME_MATRIX.md`](docs/architecture/BROWSER_RUNTIME_MATRIX.md)
- [`docs/testing/INTEGRATION_TEST_MATRIX.md`](docs/testing/INTEGRATION_TEST_MATRIX.md)
