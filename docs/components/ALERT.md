# Rainbow Alert

`rainbow-alert` displays a status message, optional title, and optional dismissal control.

```html
<rainbow-alert variant="warning" dismissible live="polite">
  <span slot="title">Review required</span>
  Some settings need attention.
</rainbow-alert>
```

## API

| Property / attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `info \| success \| warning \| danger` | `info` | Semantic visual treatment. |
| `dismissible` | `boolean` | `false` | Shows a button with the accessible name “Dismiss alert”. |
| `live` | `polite \| assertive \| off` | `polite` | Live announcement priority. `assertive` maps to `role="alert"`; `polite` maps to `role="status"`. |

Calling `dismiss()` or activating the dismiss button hides the alert content and emits composed, bubbling `rainbow-dismiss`. Call `show()` to display it again. Use assertive live announcements only for urgent information; do not make every decorative message an alert.
