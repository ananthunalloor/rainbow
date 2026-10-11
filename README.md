# Rainbow UI

A framework-agnostic Web Components library built with Lit and TypeScript.

Rainbow is designed to work from plain HTML and server-rendered templates through React, Vue, Svelte, Solid, Angular, Astro, Next.js, Nuxt, Django, and HTMX.


### Disclosure and status components

- `rainbow-tabs` — accessible tabs with automatic/manual activation and horizontal/vertical navigation. See [TABS.md](docs/components/TABS.md).
- `rainbow-accordion` — native `details`/`summary` disclosure group with optional multiple-open mode. See [ACCORDION.md](docs/components/ACCORDION.md).
- `rainbow-alert` — semantic status message with configurable live region and optional dismissal. See [ALERT.md](docs/components/ALERT.md).

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

## Core contract now available

Rainbow 0.2 establishes the first reusable design-system primitives:

- semantic design tokens and light/dark/system themes;
- `RainbowElement` as the shared Web Component base;
- `rainbow-button`;
- `rainbow-input` with form-associated behavior;
- typed Rainbow custom events;
- a documented Django + HTMX integration model.

The core package does not depend on Django, HTMX, React, Vue, Svelte, Solid, Angular, or Tailwind.

## Component contract

The first component contract is intentionally small: public attributes/properties, composed DOM events, semantic CSS variables, CSS parts, slots, native-first accessibility, and form participation through Web APIs. New components must conform before entering the supported component inventory.

## Component lab

Rainbow includes a first-class Storybook workshop for interactive component development:

```bash
pnpm storybook
```

Use the **Theme** toolbar to switch Light, Dark, and System themes, and use Controls to change component properties live. The **Rainbow / All Components / Gallery** story is the smoke-test page for the complete implemented component set.

For a framework-free browser page, including the same component set used by server-rendered applications:

```bash
pnpm dev:gallery
```

Open `/all-components.html`. This path intentionally uses plain HTML and is representative of Django template usage.
