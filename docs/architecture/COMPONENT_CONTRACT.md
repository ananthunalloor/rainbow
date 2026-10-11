# Rainbow Component Contract

Every Rainbow component must satisfy the following contract.

## Public API

Use HTML attributes for declarative configuration and reflected Lit properties for the corresponding JavaScript API.

Every public property must have:

- a stable documented type;
- a documented default;
- attribute reflection semantics where appropriate;
- a defined behavior when invalid values are supplied.

## Events

Use DOM `CustomEvent` for Rainbow-specific events.

Events must be:

- typed;
- `bubbles: true`;
- `composed: true` when they cross Shadow DOM boundaries;
- cancelable only where cancellation has a defined semantic effect.

Native browser events should remain available wherever possible.

## Styling

Components use Shadow DOM.

Customization is provided through:

- CSS custom properties;
- `part` attributes;
- slots.

Consumers must not need selectors targeting implementation details inside Shadow DOM.

## Accessibility

Components must use native semantics first and add ARIA only where necessary. Keyboard behavior must follow native controls or the relevant WAI-ARIA Authoring Practices pattern.

Focus indication is mandatory for keyboard interaction and must remain visible in forced-colors mode.

## Forms

Form controls should use `ElementInternals` and form-associated custom elements where browser support and semantics allow it.

Rainbow buttons use explicit submission/reset handling so that a `type="submit"` button can initiate the containing HTML form and therefore cooperate with server-side form handlers and HTMX form interception.
