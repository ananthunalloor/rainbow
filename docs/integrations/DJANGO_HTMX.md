# Django and HTMX Integration

Rainbow has no runtime dependency on Django or HTMX. Both integrations operate on normal HTML and DOM events.

## Django templates

Django can render Rainbow elements directly:

```html
<rainbow-input name="email" label="Email" type="email" required></rainbow-input>
<rainbow-button type="submit" variant="primary">Sign in</rainbow-button>
```

The server remains responsible for URL routing, CSRF protection, authorization, validation, and response rendering.

## HTMX

Keep HTMX attributes on light-DOM application elements rather than relying on selectors inside a Rainbow component's Shadow DOM.

```html
<form hx-post="/profile" hx-target="#profile" hx-swap="outerHTML">
  <rainbow-input name="display_name" label="Display name"></rainbow-input>
  <rainbow-button type="submit">Save</rainbow-button>
</form>
```

`rainbow-button[type="submit"]` calls `requestSubmit()` on its containing form. This allows normal `submit` events to reach the form and lets HTMX intercept the submission.

HTMX content inside Shadow DOM is intentionally not a core Rainbow concern. If a future component needs HTMX processing inside its shadow root, it should use an optional adapter that explicitly calls the HTMX processing API for that root.

## Server-rendered fragments

HTMX may replace a fragment containing Rainbow elements. Custom elements remain ordinary HTML nodes, so they can be upgraded after insertion without Django knowing anything about the component implementation.

## Auto-boot entry

For pages that do not already have a JavaScript framework, the optional `@rainbow/ui/auto` entry registers the supported custom elements and installs the default system theme when loaded in a browser. The core package itself remains side-effect free.

This makes a Django template architecture straightforward:

```html
<script type="module" src="/static/rainbow/auto.js"></script>
```

A future `django-rainbow` package may provide a template tag for emitting this asset path, but Django is not part of the core package.
