import { html, css } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowField extends RainbowElement {
  static override properties = { label: { reflect: true }, description: { reflect: true }, error: { reflect: true }, required: { type: Boolean, reflect: true } };
  static override styles = css`
    :host { display:block; color:var(--rainbow-color-text,#0f172a); font:1rem/1.5 var(--rainbow-font-family,system-ui,sans-serif); }
    .field { display:grid; gap:.375rem; }
    .label { font-weight:600; }
    .description,.error { font-size:.875rem; }
    .description { color:var(--rainbow-color-text-muted,#64748b); }
    .error { color:var(--rainbow-color-danger,#dc2626); }
  `;
  label = ''; description = ''; error = ''; required = false;
  protected override render() { return html`<div class="field"><div class="label">${this.label}${this.required ? ' *' : ''}</div><slot></slot>${this.description ? html`<div class="description">${this.description}</div>` : ''}${this.error ? html`<div class="error" role="alert">${this.error}</div>` : ''}</div>`; }
}
export function defineRainbowField(): void { if (!customElements.get('rainbow-field')) customElements.define('rainbow-field', RainbowField); }
