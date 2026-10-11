# Overlay Keyboard Test Matrix

Rainbow overlays use a shared stack so only the topmost active overlay consumes global Escape and outside-pointer interactions.

## Menu

- Trigger `Enter`, `Space`, and `ArrowDown` opens the menu.
- Trigger `ArrowUp` opens on the last item.
- `ArrowDown` and `ArrowUp` wrap through menu items.
- `Home` focuses the first item.
- `End` focuses the last item.
- Only the active item has `tabindex="0"`.
- `Escape` closes the menu and restores trigger focus.
- `Tab` closes the menu and permits normal document tab order.

## Overlay stack

- Opening a nested overlay does not close its parent.
- `Escape` closes only the topmost overlay.
- Outside pointer interaction closes only the topmost overlay first.
- Closing an overlay restores the element that was focused when that overlay opened.
- Removing an active overlay unregisters it without attempting focus restoration.
