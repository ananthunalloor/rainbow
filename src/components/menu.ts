import { css, html } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';
import { RainbowOverlayController } from '../core/overlay.js';

export class RainbowMenu extends RainbowElement {
  static override properties = { open: { type: Boolean, reflect: true }, label: { type: String } };
  static override styles = css`:host{position:relative;display:inline-block}button{font:inherit}.menu{position:absolute;z-index:1000;min-inline-size:12rem;margin:.35rem 0;padding:.25rem;border:1px solid var(--rainbow-color-border,#cbd5e1);border-radius:var(--rainbow-radius-md,.5rem);background:var(--rainbow-color-surface,#fff);box-shadow:var(--rainbow-shadow-md,0 8px 24px rgb(15 23 42/.12))}.menu ::slotted([role="menuitem"]){display:block;width:100%;padding:.5rem .65rem;border:0;background:transparent;text-align:start;font:inherit}.menu ::slotted([role="menuitem"]:hover){background:var(--rainbow-color-surface-subtle,#f1f5f9)}`;
  open = false; label = 'Menu';
  private controller = new RainbowOverlayController(this);
  connectedCallback(): void { super.connectedCallback(); this.controller.onEscape = () => this.hide(); this.controller.onOutside = () => this.hide(); }
  disconnectedCallback(): void { this.controller.deactivate(false); super.disconnectedCallback(); }
  protected override render() { return html`<button aria-haspopup="menu" aria-expanded=${this.open} @click=${this.toggle}>${this.label}</button>${this.open ? html`<div class="menu" role="menu"><slot></slot></div>` : ''}`; }
  show(): void { if (this.open) return; this.open = true; this.controller.activate(); queueMicrotask(() => this.controller.focusFirst(this.shadowRoot ?? this)); this.dispatchRainbowEvent('rainbow-open'); }
  hide(): void { if (!this.open) return; this.open = false; this.controller.deactivate(); this.dispatchRainbowEvent('rainbow-close'); }
  private toggle = (): void => this.open ? this.hide() : this.show();
}
export function defineRainbowMenu(): void { if (!customElements.get('rainbow-menu')) customElements.define('rainbow-menu', RainbowMenu); }
