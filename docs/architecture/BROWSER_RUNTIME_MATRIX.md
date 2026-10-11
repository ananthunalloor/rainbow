# Rainbow Browser and Runtime Support Matrix

## Policy

Rainbow is a Web Platform component library. The supported runtime is a modern evergreen browser with support for Custom Elements, Shadow DOM, CSS custom properties, ES modules, and the DOM APIs required by the individual component.

Rainbow does **not** support Internet Explorer or obsolete browser engines.

### Required support tiers

| Tier | Runtime | Policy |
| --- | --- | --- |
| A | Current Chrome / Chromium-based browsers | Fully supported |
| A | Current Edge | Fully supported |
| A | Current Firefox | Fully supported |
| A | Current Safari | Fully supported |
| B | Previous major release of the above | Supported where Web Platform requirements are met |
| C | Embedded/webview runtimes | Supported when their engine satisfies the component's declared requirements |
| Unsupported | IE11 and legacy non-evergreen engines | Not supported |

"Current" means the browser version in the project's tested support window, not an arbitrary historical version. The CI/browser test matrix is the source of truth for exact versions.

## Runtime independence

The core package must not require React, Vue, Svelte, Solid, Angular, Astro, Next.js, Nuxt, Django, HTMX, or another application framework.

Framework adapters, when needed, are separate packages and cannot become dependencies of `@rainbow/ui`.

## Server rendering

Rainbow components must remain valid custom elements when emitted by a server. A Django template, Rails view, PHP template, static HTML page, or another server renderer can emit Rainbow elements directly.

Lit SSR is an optional optimization, not a prerequisite for using Rainbow. Lit's SSR support currently has limitations and is therefore kept outside the core browser contract.

## Progressive enhancement

Every component must document:

1. the HTML it expects before JavaScript enhancement;
2. the behavior available after custom-element upgrade;
3. whether the component is safe to use with JavaScript disabled;
4. whether Shadow DOM affects integration with external DOM libraries;
5. its accessibility requirements.
