# Rainbow Integration Model

Rainbow is designed as a Web Platform library first. Framework integrations are consumers of the same custom-element contract, not separate component implementations.

## Layers

```text
                        ┌──────────────────────────────┐
                        │        Application UI        │
                        │ React / Vue / Svelte / etc.  │
                        └──────────────┬───────────────┘
                                       │
                        Custom Elements / DOM events
                                       │
┌───────────────────┐      ┌───────────▼───────────┐
│ Django templates  │─────▶│      @rainbow/ui      │
│ HTMX fragments    │      │  Lit + Web Platform   │
└───────────────────┘      └───────────┬───────────┘
                                       │
                              Tokens / Theme / CSS
                                       │
                               Browser Web Platform
```

## Core contract

The public API uses:

- custom elements such as `<rainbow-button>`;
- HTML attributes for serializable configuration;
- DOM properties for rich values;
- standard form semantics where applicable;
- DOM `CustomEvent`s with documented `detail` payloads;
- slots for composition;
- CSS custom properties and CSS parts for styling integration.

The core package must not inspect, import, or detect an application framework.

## Django

Django is a first-class integration target, but it is not a dependency of the core package.

A Django application can emit Rainbow elements directly:

```html
{% load static %}
<link rel="stylesheet" href="{% static 'rainbow/rainbow.css' %}">
<script type="module" src="{% static 'rainbow/rainbow.js' %}"></script>

<rainbow-button variant="primary" type="submit">
  Save
</rainbow-button>
```

Django remains responsible for URL generation, CSRF, authentication, server-side validation, and rendering. Rainbow remains responsible for client-side component behavior and presentation.

An optional Python integration package may later provide a small template-tag layer for asset loading. It must not create a second component API.

## HTMX

HTMX is also an optional integration target. Rainbow components must work with normal HTMX requests without importing HTMX.

Preferred pattern:

```html
<div id="profile-form">
  <form hx-post="/profile" hx-target="#profile-form" hx-swap="outerHTML">
    <rainbow-input name="display_name" label="Display name"></rainbow-input>
    <rainbow-button type="submit">Save</rainbow-button>
  </form>
</div>
```

The server returns ordinary HTML or Rainbow custom elements. HTMX performs the DOM swap; the browser upgrades any Rainbow elements that are introduced by the response.

### Shadow DOM boundary

HTMX does not automatically inspect a component's Shadow DOM. If an integration intentionally places HTMX attributes inside a Rainbow component's Shadow DOM, the optional HTMX bridge must explicitly call `htmx.process()` on that shadow root.

This behavior must never be hidden inside the core package.

### Targeting guidance

Prefer targeting the custom-element host or a light-DOM wrapper from HTMX:

```html
<rainbow-card id="account-card">
  ...
</rainbow-card>

<button
  hx-get="/account/card"
  hx-target="#account-card"
  hx-swap="outerHTML">
  Refresh
</button>
```

Avoid making external HTMX selectors depend on internal Shadow DOM structure. Internal markup is an implementation detail.

## Framework integrations

React, Vue, Svelte, Solid, Angular, Astro, Next.js, Nuxt, and similar environments consume Rainbow through the same custom-element API. Framework-specific wrappers are optional convenience layers and must not change component semantics.

## Tailwind

Tailwind is an integration layer. Rainbow components must remain usable without Tailwind. Tailwind utilities can style the light-DOM application around a component and, where explicitly exposed, CSS custom properties/CSS parts.
