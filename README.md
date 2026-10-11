# Rainbow UI

A framework-agnostic Web Components library built with Lit and TypeScript.

Rainbow is designed to work from plain HTML and server-rendered templates through React, Vue, Svelte, Solid, Angular, Astro, Next.js, Nuxt, Django, and HTMX.


## Implemented components (0.8.1)

Rainbow currently includes 19 custom elements:

- **Forms:** `rainbow-button`, `rainbow-input`, `rainbow-textarea`, `rainbow-select`, `rainbow-checkbox`, `rainbow-radio`, `rainbow-radio-group`, `rainbow-switch`, `rainbow-field`, `rainbow-form`.
- **Overlays and interactions:** `rainbow-dialog`, `rainbow-popover`, `rainbow-menu`, `rainbow-dropdown`, `rainbow-context-menu`, `rainbow-tooltip`.
- **Disclosure and status:** `rainbow-tabs`, `rainbow-accordion`, `rainbow-alert`.

See the [component inventory](docs/components/COMPONENT_INVENTORY.md) for the broader roadmap. “Implemented” indicates that a component exists in source and has a defined API; production readiness still depends on the documented browser and accessibility test matrices.

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
pnpm run check:storybook-config
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
- [`docs/testing/POSITIONING_BROWSER_CHECKLIST.md`](docs/testing/POSITIONING_BROWSER_CHECKLIST.md)

## Current foundation

Rainbow provides semantic design tokens, light/dark/system themes, a Lit-based Web Component base class, form-associated controls where supported, composed DOM events, and shared overlay/positioning utilities. The public API remains native-Web-Platform-first: attributes and properties, DOM events, slots, CSS custom properties, and CSS parts. Framework support is through standard custom elements rather than framework-specific component wrappers.

## Component contract

The first component contract is intentionally small: public attributes/properties, composed DOM events, semantic CSS variables, CSS parts, slots, native-first accessibility, and form participation through Web APIs. New components must conform before entering the supported component inventory.

## Component lab

Rainbow includes a first-class Storybook workshop for interactive component development:

```bash
pnpm storybook
```

Use the **Theme** toolbar to switch Light, Dark, and System themes, and use Controls to change component properties live. The **Components / Overlay controls** story also exposes direction and placement controls for testing LTR/RTL alignment. Run `pnpm check:storybook-config` for a dependency-free check of story discovery, Lit class-field settings, registration coverage, and package side-effect metadata. The **Rainbow / All Components / Gallery** story is the smoke-test page for the complete implemented component set.

For a framework-free browser page, including the same component set used by server-rendered applications:

```bash
pnpm dev:gallery
```

Open `/all-components.html`. This path intentionally uses plain HTML and is representative of Django template usage.
