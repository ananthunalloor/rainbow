# `rainbow-input`

`rainbow-input` is a form-associated custom element using `ElementInternals`. Its submitted value is the component's `value` property.

## Attributes / properties

| Name | Type | Default |
| --- | --- | --- |
| `label` | string | empty |
| `description` | string | empty |
| `error` | string | empty |
| `name` | string | empty |
| `value` | string | empty |
| `type` | string | `text` |
| `placeholder` | string | empty |
| `autocomplete` | string | empty |
| `inputmode` | string | empty |
| `minlength` | number | unset |
| `maxlength` | number | unset |
| `pattern` | string | empty |
| `required` | boolean | `false` |
| `disabled` | boolean | `false` |
| `readonly` | boolean | `false` |

## Parts

- `input`: the internal native `<input>`

## Events

- `rainbow-input`: emitted for input changes; detail contains `{ value }`.
- `rainbow-change`: emitted for change; detail contains `{ value }`.

Both events bubble and cross Shadow DOM boundaries.

## Server validation

Setting `error` marks the field with a custom validation error. This is suitable for server-rendered Django validation responses and HTMX fragment replacements.
