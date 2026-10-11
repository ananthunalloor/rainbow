import { css, html } from 'lit';
import { RainbowOverlayController } from '../core/overlay.js';
import { positionRainbowFloatingElement } from '../core/positioning.js';
import { RainbowElement } from '../core/rainbow-element.js';

const ITEM_SELECTOR = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

/** A context menu opened by the browser's contextmenu event. */
export class RainbowContextMenu extends RainbowElement {
  static override properties = { open: { type: Boolean, reflect: true }, label: { type: String } };
  static override styles = css`
    :host { display: block; }
    .target { display: contents; }
    .panel { z-index: 1100; min-inline-size: 12rem; max-inline-size: calc(100vw - 1rem); max-block-size: calc(100vh - 1rem); overflow: auto; padding: .25rem; border: 1px solid var(--rainbow-color-border, #cbd5e1); border-radius: var(--rainbow-radius-md, .5rem); background: var(--rainbow-color-surface, #fff); color: var(--rainbow-color-text, #0f172a); box-shadow: var(--rainbow-shadow-md, 0 8px 24px rgb(15 23 42 / 12%)); }
    ::slotted([role='menuitem']), ::slotted([role='menuitemcheckbox']), ::slotted([role='menuitemradio']) { display: block; width: 100%; padding: .5rem .65rem; border: 0; background: transparent; color: inherit; text-align: start; font: inherit; cursor: pointer; }
    ::slotted([role='menuitem']:hover), ::slotted([role='menuitemcheckbox']:hover), ::slotted([role='menuitemradio']:hover) { background: var(--rainbow-color-surface-subtle, #f1f5f9); }
  `;
  open = false;
  label = 'Context menu';
  private point = { x: 0, y: 0 };
  private currentIndex = -1;
  private readonly controller = new RainbowOverlayController(this, 'menu');

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', this.onContextMenu);
    this.controller.onEscape = (event) => { event.preventDefault(); this.hide(); };
    this.controller.onOutside = () => this.hide(false);
  }
  disconnectedCallback(): void { this.controller.deactivate(false); this.removeEventListener('contextmenu', this.onContextMenu); super.disconnectedCallback(); }
  protected override render() {
    return html`<div class="target"><slot></slot></div>${this.open ? html`<div class="panel" role="menu" aria-label=${this.label} @keydown=${this.onKeydown}><slot name="item" @slotchange=${this.onSlotChange}></slot></div>` : ''}`;
  }
  showAt(x: number, y: number): void {
    this.point = { x, y }; this.open = true; this.currentIndex = -1; this.controller.activate();
    void this.updateComplete.then(() => {
      const panel = this.shadowRoot?.querySelector<HTMLElement>('.panel');
      if (!panel) return;
      positionRainbowFloatingElement(this, panel, { x: this.point.x, y: this.point.y, placement: 'bottom-start', direction: 'ltr' });
      this.focusItem(0);
    });
    this.dispatchRainbowEvent('rainbow-open', { x, y });
  }
  hide(restoreFocus = true): void {
    if (!this.open) return;
    this.open = false; this.currentIndex = -1; this.controller.deactivate(restoreFocus); this.dispatchRainbowEvent('rainbow-close');
  }
  private readonly onContextMenu = (event: MouseEvent): void => {
    event.preventDefault(); this.showAt(event.clientX, event.clientY);
  };
  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (!this.items.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); this.focusItem(this.currentIndex + 1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); this.focusItem(this.currentIndex - 1); }
    else if (event.key === 'Home') { event.preventDefault(); this.focusItem(0); }
    else if (event.key === 'End') { event.preventDefault(); this.focusItem(this.items.length - 1); }
    else if (event.key === 'Tab') this.hide(false);
  };
  private readonly onSlotChange = (): void => this.syncTabIndex();
  private get items(): HTMLElement[] {
    return this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="item"]')?.assignedElements({ flatten: true }).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el.matches(ITEM_SELECTOR) && !el.hasAttribute('disabled'),
    ) ?? [];
  }
  private syncTabIndex(): void { this.items.forEach((item, index) => { item.tabIndex = index === this.currentIndex ? 0 : -1; }); }
  private focusItem(index: number): void {
    const items = this.items; if (!items.length) return;
    this.currentIndex = ((index % items.length) + items.length) % items.length;
    this.syncTabIndex(); items[this.currentIndex]?.focus({ preventScroll: true });
  }
}
export function defineRainbowContextMenu(): void { if (!customElements.get('rainbow-context-menu')) customElements.define('rainbow-context-menu', RainbowContextMenu); }
