# Django + HTMX Integration

Rainbow can be used directly in Django templates and in Django applications that use HTMX. No React/Vue/Svelte runtime is required.

## 1. Static assets

Build Rainbow with the normal JavaScript package tooling and expose the resulting assets through Django's staticfiles system.

A Django base template can load the bundle with Django's `{% static %}` tag:

```html
{% load static %}
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="{% static 'rainbow/rainbow.css' %}">
  </head>
  <body>
    {% block content %}{% endblock %}
    <script type="module" src="{% static 'rainbow/rainbow.js' %}"></script>
  </body>
</html>
```

The optional Django adapter may later provide `{% rainbow_assets %}` to avoid repeating these paths, but this is convenience only.

## 2. Plain Django template usage

```html
<form method="post">
  {% csrf_token %}

  <rainbow-input
    name="email"
    type="email"
    label="Email"
    required>
  </rainbow-input>

  <rainbow-button type="submit" variant="primary">
    Sign in
  </rainbow-button>
</form>
```

The server remains authoritative for validation and security. Rainbow's client-side validation is an enhancement, not a replacement for Django validation.

## 3. HTMX fragment pattern

A Django view can return a partial containing Rainbow elements:

```html
<div id="account-settings">
  <form
    method="post"
    hx-post="{% url 'account-settings' %}"
    hx-target="#account-settings"
    hx-swap="outerHTML">
    {% csrf_token %}

    <rainbow-input
      name="display_name"
      label="Display name"
      value="{{ form.display_name.value|default:'' }}">
    </rainbow-input>

    <rainbow-button type="submit" variant="primary">
      Save changes
    </rainbow-button>
  </form>
</div>
```

The response may contain a completely new `<rainbow-input>` or `<rainbow-button>`. Custom-element upgrade happens independently of HTMX.

## 4. Forms and Django

Rainbow form controls should use native form participation where appropriate. For form-associated custom elements, use `ElementInternals` rather than inventing a second serialization protocol.

Django must still validate the submitted values on the server.

## 5. CSRF

Rainbow does not own CSRF handling. Django/HTMX configuration remains responsible for sending the CSRF token on unsafe requests.

## 6. Shadow DOM rule

Do not put HTMX request attributes inside Shadow DOM unless there is a specific component-level reason to do so.

If this is required, an optional `@rainbow/htmx` integration can expose an explicit registration function:

```ts
registerRainbowHtmx(htmx);
```

Its responsibility is limited to integrating HTMX with Rainbow's Shadow DOM boundaries. The core package must remain HTMX-free.

## 7. Recommended architecture

```text
Django URL/view
      │
      ├── full-page template
      │       └── Rainbow custom elements
      │
      └── HTMX partial
              └── Rainbow custom elements

Browser
  ├── HTMX performs HTTP + DOM swaps
  └── Rainbow upgrades custom elements + handles component behavior
```

This gives Django/HTMX applications a progressive-enhancement path without requiring a JavaScript SPA architecture.
