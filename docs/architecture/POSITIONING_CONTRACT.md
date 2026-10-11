# Floating element positioning contract

`positionRainbowFloatingElement()` is the viewport-positioning primitive for floating content rendered by a custom element. It uses viewport coordinates with `position: fixed`, tries the preferred placement, considers the opposite side and alternate alignment, then shifts the panel inside the viewport padding. It supports pointer coordinates for context menus. `observeRainbowPosition()` tracks resize and captured scroll events and returns a cleanup function; components must invoke that cleanup when closed or disconnected.

Supported placements are `bottom-start`, `bottom-end`, `top-start`, `top-end`, `right-start`, `right-end`, `left-start`, and `left-end`. For top/bottom placements, `start` and `end` are logical inline alignment points and respect the anchor's computed `direction` by default. Pass `direction: 'ltr'` or `direction: 'rtl'` to override this behavior. For left/right placements, start/end align to the top/bottom of the anchor.

The primitive deliberately does not portal content. Keep floating content inside its component's Shadow DOM, and be aware that transformed ancestors can establish fixed-position containing blocks. It does not yet implement nested scroll clipping, transformed-containing-block detection, virtual references, arrow elements, or anchor-hiding policies. Those limitations need real-browser coverage before treating the positioning layer as a full collision engine.

## Components

- `rainbow-dropdown`: button-triggered action menu; accepts `label` and `placement`; slotted actionable items must carry `role="menuitem"`, `menuitemcheckbox`, or `menuitemradio`.
- `rainbow-context-menu`: listens for `contextmenu` on its host; normal content is in the default slot and menu items use `slot="item"` with an appropriate menuitem role.

Both components emit bubbling, composed `rainbow-open` and `rainbow-close` events. Escape dismissal restores focus; outside-pointer dismissal does not force focus back to the trigger. Components do not execute actions or automatically close on item activation: the application owns item behavior and may call `hide()`.

Real-browser verification is required for nested scroll containers, transforms, viewport edges, RTL locales, zoom, and mobile visual viewports. Unit tests validate coordinate selection but do not replace browser tests.
