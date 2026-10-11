# Rainbow Tabs

`rainbow-tabs` provides an accessible tablist while keeping the tab controls and panel content in light DOM.

```html
<rainbow-tabs label="Account settings" orientation="horizontal" activation="automatic">
  <button slot="tab">Profile</button>
  <button slot="tab">Security</button>
  <section slot="panel">Profile settings…</section>
  <section slot="panel">Security settings…</section>
</rainbow-tabs>
```

## API

| Property / attribute | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `Tabs` | Accessible name for the tablist. |
| `selectedIndex` / `selected-index` | `number` | `0` | Zero-based selected tab index. |
| `orientation` | `horizontal \| vertical` | `horizontal` | Tab layout and matching arrow-key direction. |
| `activation` | `automatic \| manual` | `automatic` | Automatic selects on arrow navigation; manual selects with Enter/Space. |

Tab and panel elements are paired by DOM order. Use native buttons for tabs, provide meaningful labels, and keep the number of tabs equal to the number of panels. The component adds `role`, `aria-selected`, `aria-controls`, `aria-labelledby`, `tabindex`, and panel `hidden` state. It emits `rainbow-change` with `{ selectedIndex, tab }` when selection changes.

Arrow keys wrap through tabs. Home and End move to the first and last tab. Horizontal tabs use Left/Right; vertical tabs use Up/Down. In manual activation mode, arrow keys only move focus.

## Styling

The component uses Rainbow semantic tokens and supports documented CSS custom properties, the host attributes, and CSS parts/slots where available. Since tab and panel nodes remain in light DOM, consumers can also style those nodes from their own stylesheets.
