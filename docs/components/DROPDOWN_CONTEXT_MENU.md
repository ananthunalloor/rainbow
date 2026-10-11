# Dropdown and context menu

## Dropdown

```html
<rainbow-dropdown label="Actions" placement="bottom-start">
  <button role="menuitem">Rename</button>
  <button role="menuitem">Archive</button>
</rainbow-dropdown>
```

The trigger supports Enter, Space, ArrowDown, and ArrowUp. Menu navigation supports ArrowUp/ArrowDown, Home/End, Escape, and Tab dismissal. Disabled items are excluded from the roving focus sequence. Listen for `rainbow-open` and `rainbow-close` for application state synchronization.

## Context menu

```html
<rainbow-context-menu>
  <p>Right-click this region.</p>
  <button slot="item" role="menuitem">Copy</button>
  <button slot="item" role="menuitem">Inspect</button>
</rainbow-context-menu>
```

The browser context menu is suppressed only when the event originates within this component. The menu opens at the pointer location and is shifted into the viewport. Context menus should also have an alternate keyboard-accessible command path in the surrounding application.

## Django and HTMX

Render these elements directly in templates. They have no Django or HTMX dependency. After an HTMX swap, newly inserted custom elements upgrade normally; application-owned listeners attached directly to replaced nodes should be reattached using the application's standard lifecycle strategy.
