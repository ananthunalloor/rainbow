# Rainbow Accessibility Contract

Accessibility is a release requirement, not an optional enhancement.

## Native semantics first

Use native HTML controls and browser behavior whenever possible. ARIA supplements semantics only when native HTML cannot express the required state or relationship.

## Keyboard interaction

Interactive controls must be usable with keyboard navigation. Do not introduce custom keyboard behavior where the native element already provides the correct behavior.

## Focus

Every interactive component must expose a visible `:focus-visible` indicator. The indicator must remain distinguishable in forced-colors mode.

## Labels and descriptions

Form controls must expose an accessible name. Descriptions and validation errors must be associated with the control using `aria-describedby` or equivalent platform semantics.

## Validation

Form-associated controls must surface native validity where supported. Custom validation messages must not remove the browser's ability to report invalid state.

## Motion and contrast

Components must respect `prefers-reduced-motion`, and the theme system must provide sufficient contrast for text, controls, borders, and focus indicators. Forced-colors mode must not be disabled by Rainbow styles.
