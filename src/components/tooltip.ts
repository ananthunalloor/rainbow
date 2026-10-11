import { css, html } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowTooltip extends RainbowElement {
  static override properties = { open: { type: Boolean, reflect: true }, content: { type: String } };
  static override styles = css`:host{position:relative;display:inline-block}.tip{position:absolute;z-index:1100;inset-block-start:calc(100% + .4rem);inset-inline-start:50%;transform:translateX(-50%);max-inline-size:18rem;padding:.35rem .5rem;border-radius:var(--rainbow-radius-sm,.35rem);background:var(--rainbow-color-text,#0f172a);color:var(--rainbow-color-surface,#fff);font-size:.875rem;line-height:1.3;pointer-events:none}`;
  open = false; content = '';
  protected override render() { return html`<span @mouseenter=${this.show} @mouseleave=${this.hide} @focusin=${this.show} @focusout=${this.hide}><slot></slot></span>${this.open && this.content ? html`<span class="tip" role="tooltip">${this.content}</span>` : ''}`; }
  show(): void { this.open = true; }
  hide(): void { this.open = false; }
}
export function defineRainbowTooltip(): void { if (!customElements.get('rainbow-tooltip')) customElements.define('rainbow-tooltip', RainbowTooltip); }
