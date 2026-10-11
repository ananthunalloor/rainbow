# Rainbow Interaction Primitives

This phase establishes reusable interaction primitives before expanding the component catalogue.

## Components

- `rainbow-radio`
- `rainbow-radio-group`
- `rainbow-switch`
- `rainbow-field`
- `rainbow-form`
- `rainbow-dialog`
- `rainbow-popover`

## Rules

1. Prefer native platform controls and semantics.
2. Preserve keyboard and focus behavior of the underlying control.
3. Use `ElementInternals` for form-associated custom elements where appropriate.
4. Events are composed, bubbling DOM `CustomEvent`s with stable names and typed details.
5. No Rainbow component imports HTMX, React, Vue, Django, or another framework.
6. Shadow DOM internals are private; integration happens through attributes, properties, slots, CSS custom properties, parts, and DOM events.
7. Dialog and popover behavior must remain usable when a Django/HTMX response replaces the surrounding light-DOM fragment.

## Current limitation

`rainbow-popover` is intentionally a small foundation around a local trigger/panel. Full positioning, collision handling, focus restoration, and the Popover API compatibility layer belong to the next overlay milestone.

## Overlay contract

Rainbow overlays use a shared `RainbowOverlayController` for document-level Escape handling, outside-pointer handling, and focus restoration. Components remain self-contained and do not depend on framework lifecycle or global application state.

The current overlay components are:

- `rainbow-dialog` — native `<dialog>` and `showModal()`/`show()` semantics.
- `rainbow-popover` — lightweight anchored popover.
- `rainbow-menu` — menu trigger and slotted `role="menuitem"` content.
- `rainbow-tooltip` — hover/focus tooltip presentation.

Positioning is intentionally simple until the positioning contract is finalized. A later overlay phase will define collision handling, RTL placement, nested overlays, and optional native Popover API integration.
