import { css, html } from 'lit';
import { RainbowOverlayController } from '../core/overlay.js';
import { observeRainbowPosition, positionRainbowFloatingElement, type RainbowPlacement } from '../core/positioning.js';
import { RainbowElement } from '../core/rainbow-element.js';

const ITEM_SELECTOR = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

/** A button-triggered, positioned menu for actions. */
export class RainbowDropdown extends RainbowElement {
  static override properties = {
    open: { type: Boolean, reflect: true }, label: { type: String }, placement: { type: String },
  };
  static override styles = css`
    :host { display: inline-block; }
    button { font: inherit; }
    .panel { z-index: 1000; min-inline-size: 12rem; max-inline-size: calc(100vw - 1rem); max-block-size: calc(100vh - 1rem); overflow: auto; padding: .25rem; border: 1px solid var(--rainbow-color-border, #cbd5e1); border-radius: var(--rainbow-radius-md, .5rem); background: var(--rainbow-color-surface, #fff); color: var(--rainbow-color-text, #0f172a); box-shadow: var(--rainbow-shadow-md, 0 8px 24px rgb(15 23 42 / 12%)); }
    ::slotted([role='menuitem']), ::slotted([role='menuitemcheckbox']), ::slotted([role='menuitemradio']) { display: block; box-sizing: border-box; width: 100%; padding: .5rem .65rem; border: 0; border-radius: .25rem; background: transparent; color: inherit; text-align: start; font: inherit; cursor: pointer; }
    ::slotted([role='menuitem']:hover), ::slotted([role='menuitemcheckbox']:hover), ::slotted([role='menuitemradio']:hover) { background: var(--rainbow-color-surface-subtle, #f1f5f9); }
  `;
  open = false;
  label = 'Actions';
  placement: RainbowPlacement = 'bottom-start';
  private readonly controller = new RainbowOverlayController(this, 'menu');
  private cleanupPosition: (() => void) | null = null;
  private currentIndex = -1;

  connectedCallback(): void {
    super.connectedCallback();
    this.controller.onEscape = (event) => { event.preventDefault(); this.hide(); };
    this.controller.onOutside = () => this.hide(false);
  }
  disconnectedCallback(): void { this.cleanupPosition?.(); this.controller.deactivate(false); super.disconnectedCallback(); }

  protected override render() {
    return html`<button part="trigger" aria-haspopup="menu" aria-expanded=${this.open ? 'true' : 'false'} @click=${this.toggle} @keydown=${this.onTriggerKeydown}><slot name="trigger">${this.label}</slot></button>
      ${this.open ? html`<div class="panel" role="menu" aria-label=${this.label} @keydown=${this.onMenuKeydown}><slot @slotchange=${this.onSlotChange}></slot></div>` : ''}`;
  }
  show(): void {
    if (this.open) return;
    this.open = true; this.currentIndex = -1; this.controller.activate();
    void this.updateComplete.then(() => {
      const trigger = this.shadowRoot?.querySelector('button');
      const panel = this.shadowRoot?.querySelector<HTMLElement>('.panel');
      if (!trigger || !panel) return;
      const update = (): void => positionRainbowFloatingElement(trigger, panel, { placement: this.placement });
      update(); this.cleanupPosition = observeRainbowPosition(trigger, panel, update);
      this.focusItem(0);
    });
    this.dispatchRainbowEvent('rainbow-open');
  }
  hide(restoreFocus = true): void {
    if (!this.open) return;
    this.open = false; this.currentIndex = -1; this.cleanupPosition?.(); this.cleanupPosition = null;
    this.controller.deactivate(restoreFocus); this.dispatchRainbowEvent('rainbow-close');
  }
  private readonly toggle = (): void => { this.open ? this.hide() : this.show(); };
  private readonly onTriggerKeydown = (event: KeyboardEvent): void => {
    if (['ArrowDown', 'Enter', ' '].includes(event.key)) { event.preventDefault(); this.show(); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); this.show(); void this.updateComplete.then(() => this.focusItem(-1)); }
  };
  private readonly onMenuKeydown = (event: KeyboardEvent): void => {
    if (!this.items.length) return;
    if (event.key === 'ArrowDown') { event.preventDefault(); this.focusItem(this.currentIndex + 1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); this.focusItem(this.currentIndex - 1); }
    else if (event.key === 'Home') { event.preventDefault(); this.focusItem(0); }
    else if (event.key === 'End') { event.preventDefault(); this.focusItem(this.items.length - 1); }
    else if (event.key === 'Tab') this.hide(false);
  };
  private readonly onSlotChange = (): void => { this.syncTabIndex(); };
  private get items(): HTMLElement[] {
    return this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])')?.assignedElements({ flatten: true }).filter(
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
export function defineRainbowDropdown(): void { if (!customElements.get('rainbow-dropdown')) customElements.define('rainbow-dropdown', RainbowDropdown); }
