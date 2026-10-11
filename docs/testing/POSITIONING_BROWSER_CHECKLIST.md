# Positioning browser checklist

Run this checklist against the plain HTML gallery and Storybook in Chromium, Firefox, and WebKit before treating positioning as production-ready. Unit tests cover placement arithmetic; they do not emulate visual viewports, clipping ancestors, zoom, or browser focus details.

## Viewport and collision

- [ ] `bottom-start` stays below the anchor when there is room.
- [ ] `bottom-start` flips above the anchor when it would overflow the viewport and the top has more room.
- [ ] `top-start` flips below when the top has insufficient room.
- [ ] `right-start` flips left and `left-start` flips right where possible.
- [ ] Both start/end alignment and viewport shifting are correct near each horizontal edge.
- [ ] Tall/wide menu panels stay scrollable and do not produce page-level overflow.
- [ ] Resize and nested scrolling reposition an open dropdown; listeners stop after close/removal.

## Direction, zoom, and input

- [ ] `bottom-start` / `bottom-end` use logical inline direction under `dir="rtl"`.
- [ ] Context menus open near the pointer, including near each viewport corner.
- [ ] Browser zoom at 200% does not cause the menu to become unreachable.
- [ ] Keyboard-only operation works without a mouse; Escape restores focus and outside-pointer dismissal does not steal focus.
- [ ] Touch input can open dropdowns and interact with menu items.

## Shadow DOM and layout

- [ ] Test within a scrolling container, a transformed ancestor, and nested custom elements.
- [ ] Test when the anchor is removed while the menu is open.
- [ ] Test high contrast / forced colors and reduced motion settings.

Record browser versions and any deviations in the release PR. A checklist pass must be based on actual browser execution, not merely on the existence of unit tests.
