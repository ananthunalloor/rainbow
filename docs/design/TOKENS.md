# Rainbow Design Tokens

Rainbow uses a three-layer token model.

## Primitive tokens

Primitive values are palette and scale definitions. They are implementation details and should not normally be used by application code.

Examples include:

- `--rainbow-color-violet-*`
- `--rainbow-color-slate-*`
- spacing and radius scales

## Semantic tokens

Semantic tokens describe intent rather than hue:

- `--rainbow-color-primary`
- `--rainbow-color-background`
- `--rainbow-color-surface`
- `--rainbow-color-text`
- `--rainbow-color-text-muted`
- `--rainbow-color-border`
- `--rainbow-color-focus-ring`
- `--rainbow-color-success`
- `--rainbow-color-warning`
- `--rainbow-color-danger`
- `--rainbow-color-info`

Applications should prefer semantic tokens so that light, dark, custom, forced-colors, and future themes can change without rewriting component styles.

## Component tokens

Component-specific tokens will be added only when semantic tokens cannot express an intentional component-level customization. They will use the component namespace, for example:

```css
--rainbow-button-height
--rainbow-button-radius
```

No component should require application authors to override internal selectors in order to theme it.

## CSS API

The public CSS customization surface is limited to:

1. documented CSS custom properties;
2. documented `part` names;
3. documented slots.

Shadow DOM internals are private implementation details.
