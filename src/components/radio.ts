import { html, css } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowRadio extends RainbowElement {
  static override properties = { value: { reflect: true }, checked: { type: Boolean, reflect: true }, disabled: { type: Boolean, reflect: true }, label: { reflect: true } };
  static override styles = css`
    :host { display:block; }
    label { display:inline-flex; align-items:center; gap:.5rem; cursor:pointer; font:inherit; color:var(--rainbow-color-text,#0f172a); }
    :host([disabled]) label { opacity:.6; cursor:not-allowed; }
    input { inline-size:1rem; block-size:1rem; accent-color:var(--rainbow-color-primary,#7c3aed); }
  `;
  value = '';
  checked = false;
  disabled = false;
  label = '';
  protected override render() { return html`<label><input type="radio" .value=${this.value} .checked=${this.checked} ?disabled=${this.disabled} @change=${this.change} /><slot>${this.label}</slot></label>`; }
  override focus(options?: FocusOptions): void { this.shadowRoot?.querySelector<HTMLInputElement>('input')?.focus(options); }
  private change = (): void => { this.checked = true; this.dispatchRainbowEvent('rainbow-radio-change', { value: this.value }); };
}
export function defineRainbowRadio(): void { if (!customElements.get('rainbow-radio')) customElements.define('rainbow-radio', RainbowRadio); }
