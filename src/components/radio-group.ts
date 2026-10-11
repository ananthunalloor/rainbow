import { html, css } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowRadioGroup extends RainbowElement {
  static override properties = { label: { reflect: true }, name: { reflect: true }, value: { reflect: true }, required: { type: Boolean, reflect: true }, orientation: { reflect: true } };
  static override styles = css`
    :host { display:block; color:var(--rainbow-color-text,#0f172a); font:1rem/1.5 var(--rainbow-font-family,system-ui,sans-serif); }
    fieldset { border:0; padding:0; margin:0; display:grid; gap:.5rem; }
    legend { font-weight:600; margin-block-end:.375rem; }
    :host([orientation='horizontal']) fieldset { display:flex; flex-wrap:wrap; gap:1rem; }
  `;
  label = '';
  name = '';
  value = '';
  required = false;
  orientation: 'vertical' | 'horizontal' = 'vertical';
  protected override render() { return html`<fieldset role="radiogroup" @rainbow-radio-change=${this.onRadioChange}><legend>${this.label}</legend><slot></slot></fieldset>`; }
  protected override updated(): void { this.syncChildren(); }
  private syncChildren(): void {
    this.querySelectorAll<HTMLElement>('rainbow-radio').forEach((radio) => {
      radio.setAttribute('aria-label', radio.getAttribute('label') ?? '');
      if ((radio as unknown as { value: string }).value === this.value) (radio as unknown as { checked: boolean }).checked = true;
    });
  }
  private onRadioChange = (event: CustomEvent<{ value: string }>): void => {
    event.stopPropagation(); this.value = event.detail.value; this.dispatchRainbowEvent('rainbow-change', { value: this.value });
    this.querySelectorAll<HTMLElement>('rainbow-radio').forEach((radio) => { (radio as unknown as { checked: boolean }).checked = radio.getAttribute('value') === this.value; });
  };
}
export function defineRainbowRadioGroup(): void { if (!customElements.get('rainbow-radio-group')) customElements.define('rainbow-radio-group', RainbowRadioGroup); }
