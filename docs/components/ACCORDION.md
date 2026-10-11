# Rainbow Accordion

`rainbow-accordion` is a small styling and grouping layer over native HTML `details` and `summary` elements. Native disclosure semantics and browser keyboard behavior are deliberately retained.

```html
<rainbow-accordion>
  <details open>
    <summary>Profile</summary>
    <p>Profile settings…</p>
  </details>
  <details>
    <summary>Security</summary>
    <p>Security settings…</p>
  </details>
</rainbow-accordion>
```

## API

| Property / attribute | Type | Default | Description |
|---|---|---|---|
| `allowMultiple` / `allow-multiple` | `boolean` | `false` | When false, the group normalizes to at most one open direct-child `details`; when true, multiple sections may remain open. |

`rainbow-change` bubbles and is composed. Its detail contains the changed `item`, its `open` state, and current `openItems`. Keep each `details` element as a direct child of the accordion for group exclusivity to apply.

Do not put interactive controls inside a `summary` unless their interaction is well-defined for nested disclosure controls. Use the native `disabled` substitute only when it has a clear interaction model; `details` does not have a standard disabled attribute.
