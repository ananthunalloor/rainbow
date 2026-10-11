# `rainbow-button`

`rainbow-button` provides a native-button-like API while retaining Web Component encapsulation.

## Attributes / properties

| Name | Values | Default |
| --- | --- | --- |
| `variant` | `primary`, `secondary`, `ghost`, `danger` | `primary` |
| `size` | `small`, `medium`, `large` | `medium` |
| `type` | `button`, `submit`, `reset` | `button` |
| `disabled` | boolean | `false` |
| `name` | string | empty |
| `value` | string | empty |
| `form` | form element ID | empty |

## Slots

- default slot: button label/content
- `icon-start`: leading icon
- `icon-end`: trailing icon

## Parts

- `button`: the internal native `<button>`

## Events

`rainbow-activate` is a composed, bubbling, cancelable `CustomEvent`. Calling `preventDefault()` cancels Rainbow's submit/reset action.

## Forms

`type="submit"` invokes `HTMLFormElement.requestSubmit()` on the containing form, or the form identified by the `form` attribute. Native constraint validation and the form's `submit` event therefore remain in control of form processing.
