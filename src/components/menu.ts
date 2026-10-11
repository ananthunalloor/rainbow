import { css, html } from 'lit';
import { RainbowOverlayController } from '../core/overlay.js';
import { RainbowElement } from '../core/rainbow-element.js';

const MENU_ITEM_SELECTOR =
  '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

export class RainbowMenu extends RainbowElement {
  static override properties = {
    open: { type: Boolean, reflect: true },
    label: { type: String },
  };

  static override styles = css`
    :host { position: relative; display: inline-block; }
    button { font: inherit; }
    .menu {
      position: absolute;
      z-index: 1000;
      min-inline-size: 12rem;
      margin: 0.35rem 0;
      padding: 0.25rem;
      border: 1px solid var(--rainbow-color-border, #cbd5e1);
      border-radius: var(--rainbow-radius-md, 0.5rem);
      background: var(--rainbow-color-surface, #fff);
      box-shadow: var(--rainbow-shadow-md, 0 8px 24px rgb(15 23 42 / 12%));
    }
    .menu ::slotted([role='menuitem']),
    .menu ::slotted([role='menuitemcheckbox']),
    .menu ::slotted([role='menuitemradio']) {
      display: block;
      width: 100%;
      padding: 0.5rem 0.65rem;
      border: 0;
      background: transparent;
      text-align: start;
      font: inherit;
      cursor: pointer;
    }
    .menu ::slotted([role='menuitem']:hover),
    .menu ::slotted([role='menuitemcheckbox']:hover),
    .menu ::slotted([role='menuitemradio']:hover) {
      background: var(--rainbow-color-surface-subtle, #f1f5f9);
    }
  `;

  open = false;
  label = 'Menu';

  private readonly controller = new RainbowOverlayController(this, 'menu');
  private currentIndex = -1;

  connectedCallback(): void {
    super.connectedCallback();
    this.controller.onEscape = (event) => {
      event.preventDefault();
      this.hide();
    };
    this.controller.onOutside = () => this.hide();
  }

  disconnectedCallback(): void {
    this.controller.deactivate(false);
    super.disconnectedCallback();
  }

  protected override render() {
    return html`
      <button
        aria-haspopup="menu"
        aria-expanded=${this.open ? 'true' : 'false'}
        @click=${this.toggle}
        @keydown=${this.onTriggerKeydown}
      >
        ${this.label}
      </button>
      ${this.open
        ? html`
            <div class="menu" role="menu" aria-label=${this.label} @keydown=${this.onMenuKeydown}>
              <slot @slotchange=${this.onSlotChange}></slot>
            </div>
          `
        : ''}
    `;
  }

  show(): void {
    if (this.open) return;
    this.open = true;
    this.currentIndex = -1;
    this.controller.activate();
    queueMicrotask(() => this.focusItem(0));
    this.dispatchRainbowEvent('rainbow-open');
  }

  hide(restoreFocus = true): void {
    if (!this.open) return;
    this.open = false;
    this.currentIndex = -1;
    this.controller.deactivate(restoreFocus);
    this.dispatchRainbowEvent('rainbow-close');
  }

  private readonly toggle = (): void => {
    if (this.open) this.hide();
    else this.show();
  };

  private readonly onTriggerKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.open) this.show();
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.open) this.show();
      queueMicrotask(() => this.focusItem(-1));
    }
  };

  private readonly onMenuKeydown = (event: KeyboardEvent): void => {
    const items = this.menuItems;
    if (items.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusItem(this.currentIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusItem(this.currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusItem(items.length - 1);
        break;
      case 'Tab':
        this.hide(false);
        break;
      default:
        break;
    }
  };

  private readonly onSlotChange = (): void => {
    this.syncItemTabIndexes();
    if (this.open && this.currentIndex >= this.menuItems.length) {
      this.currentIndex = this.menuItems.length - 1;
    }
  };

  private get menuItems(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements({ flatten: true }).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element.matches(MENU_ITEM_SELECTOR),
    );
  }

  private syncItemTabIndexes(): void {
    for (const [index, item] of this.menuItems.entries()) {
      item.tabIndex = index === this.currentIndex ? 0 : -1;
    }
  }

  private focusItem(index: number): void {
    const items = this.menuItems;
    if (items.length === 0) return;
    const normalized = ((index % items.length) + items.length) % items.length;
    this.currentIndex = normalized;
    this.syncItemTabIndexes();
    items[normalized]?.focus({ preventScroll: true });
  }
}

export function defineRainbowMenu(): void {
  if (!customElements.get('rainbow-menu')) customElements.define('rainbow-menu', RainbowMenu);
}
