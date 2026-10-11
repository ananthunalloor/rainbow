# Rainbow Overlay Contract

Rainbow overlay components share one behavioral contract.

## Rules

1. Components remain framework-agnostic and own their lifecycle.
2. Document listeners are installed only while an overlay is active.
3. Escape handling is component-owned and deterministic.
4. Focus is restored to the invoking element when the overlay closes.
5. Outside pointer handling uses `composedPath()` so Shadow DOM boundaries are respected.
6. Overlay content is never required to live in a framework portal.
7. Django and HTMX may replace the host element without a global overlay registry.
8. Positioning is logical-direction aware and will be extended with collision handling before the overlay family is considered stable.
9. Dialog uses the platform `<dialog>` element and its native modal behavior.
10. Future native Popover API integration must remain progressive enhancement, not a browser-only dependency.
