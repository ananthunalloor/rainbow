# Floating element positioning contract

Rainbow's `positionRainbowFloatingElement()` is a browser-only positioning primitive for floating content rendered by a custom element. It uses viewport coordinates and `position: fixed`, flips vertically when the preferred side overflows, shifts into viewport padding, and supports a pointer coordinate for context menus. `observeRainbowPosition()` tracks resize and scroll changes and returns a cleanup function; components must invoke that cleanup when closed or disconnected.

Supported placements are `bottom-start`, `bottom-end`, `top-start`, `top-end`, `right-start`, and `left-start`. Start/end are logical alignment names, but automatic direction-aware resolution and full collision detection for all side placements are future work. The utility does not portal elements, so consumers should keep floating content inside the component's Shadow DOM and avoid ancestor transforms that alter fixed-position containing blocks.

## Components

- `rainbow-dropdown`: button-triggered action menu; accepts `label` and `placement`; slotted actionable items must carry `role="menuitem"`, `menuitemcheckbox`, or `menuitemradio`.
- `rainbow-context-menu`: listens for `contextmenu` on its host; normal content is in the default slot and menu items use `slot="item"` with an appropriate menuitem role.

Both components emit bubbling, composed `rainbow-open` and `rainbow-close` events. Dismissal through Escape restores focus; outside-pointer and Tab dismissal do not force focus back to the trigger. Components do not execute actions or automatically close on item activation: the application owns item behavior and may call `hide()`.

## Limitations

This is a foundation, not a replacement for a full positioning engine. It does not yet support virtual references, arrow elements, nested scroll clipping, transformed containing-block detection, or automatic RTL placement. Keyboard behavior and positioning should be validated in real browsers before production use.
