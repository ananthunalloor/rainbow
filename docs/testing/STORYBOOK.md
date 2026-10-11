# Rainbow Storybook and Component Lab

Rainbow uses Storybook for Web Components + Vite as its interactive component laboratory. Storybook's Web Components framework is designed for Vite-based Web Component libraries, and its Controls/Args system provides live editing of component inputs. [Storybook Web Components + Vite documentation](https://storybook.js.org/docs/get-started/frameworks/web-components-vite)

## Run

```bash
pnpm storybook
```

Then open `http://localhost:6006`.

Build the static workshop with:

```bash
pnpm build-storybook
```

## Theme testing

The Storybook toolbar contains a Rainbow Theme control:

- Light
- Dark
- System

Storybook globals are used instead of ordinary story args because the theme is a cross-story setting. [Storybook toolbar and globals documentation](https://storybook.js.org/docs/essentials/toolbars-and-globals)

## Component testing

Each implemented component should expose:

- interactive Args/Controls for public properties
- representative states
- keyboard behavior
- disabled/error/required states where applicable
- event behavior
- accessibility checks
- slot examples where applicable

The `Rainbow / All Components / Gallery` story is the smoke-test page for the complete implemented component set.

## Framework-independent gallery

For browser-level testing without Storybook:

```bash
pnpm dev:gallery
```

This serves `examples/all-components.html` as plain HTML. It is intentionally framework-free and is representative of Django template consumption.

## CI contract

Storybook configuration, stories, and the framework-free gallery are included in `pnpm typecheck:storybook`. The normal `pnpm verify` pipeline runs this check in addition to the library typecheck, lint, tests, and build.
For startup/rendering errors, especially Lit reactive-property class-field warnings, see [Storybook troubleshooting](./STORYBOOK_TROUBLESHOOTING.md).
