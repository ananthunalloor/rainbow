import { html, css } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowForm extends RainbowElement {
  static override properties = { action: { reflect: true }, method: { reflect: true }, novalidate: { type: Boolean, reflect: true } };
  static override styles = css`:host{display:block}form{display:contents}`;
  action = ''; method = 'get'; novalidate = false;
  protected override render() { return html`<form action=${this.action || undefined} method=${this.method} ?novalidate=${this.novalidate} @submit=${this.submit}><slot></slot></form>`; }
  private submit = (event: SubmitEvent): void => { this.dispatchRainbowEvent('rainbow-submit', { originalEvent: event }); };
}
export function defineRainbowForm(): void { if (!customElements.get('rainbow-form')) customElements.define('rainbow-form', RainbowForm); }
