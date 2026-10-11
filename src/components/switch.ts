import { html, css } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowSwitch extends RainbowElement {
  static formAssociated = true;
  static override properties = {
    label: { reflect: true },
    name: { reflect: true },
    value: { reflect: true },
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static override styles = css`
    :host { display: inline-block; color: var(--rainbow-color-text, #0f172a); }
    label { display: inline-flex; align-items: center; gap: .625rem; cursor: pointer; font: 600 1rem/1.5 var(--rainbow-font-family, system-ui, sans-serif); }
    :host([disabled]) label { cursor: not-allowed; opacity: .6; }
    input { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
    .track { inline-size: 2.75rem; block-size: 1.5rem; border-radius: 999px; background: var(--rainbow-color-border-strong, #94a3b8); padding: .125rem; transition: background-color var(--rainbow-motion-duration-fast,120ms); }
    .thumb { display: block; inline-size: 1.25rem; block-size: 1.25rem; border-radius: 50%; background: var(--rainbow-color-surface, #fff); box-shadow: var(--rainbow-shadow-sm); transform: translateX(0); transition: transform var(--rainbow-motion-duration-fast,120ms); }
    :host([checked]) .track { background: var(--rainbow-color-primary, #7c3aed); }
    :host([checked]) .thumb { transform: translateX(1.25rem); }
    input:focus-visible + .track { outline: 3px solid var(--rainbow-color-focus-ring, #7c3aed); outline-offset: 2px; }
  `;

  label = '';
  name = '';
  value = 'on';
  checked = false;
  disabled = false;
  private readonly internals = this.attachInternals();

  protected override render() {
    return html`<label><input type="checkbox" role="switch" .checked=${this.checked} ?disabled=${this.disabled} @change=${this.onChange} /><span class="track" aria-hidden="true"><span class="thumb"></span></span><span><slot>${this.label}</slot></span></label>`;
  }

  override focus(options?: FocusOptions): void { this.shadowRoot?.querySelector<HTMLInputElement>('input')?.focus(options); }
  checkValidity(): boolean { return this.internals.checkValidity(); }
  reportValidity(): boolean { return this.internals.reportValidity(); }
  get form(): HTMLFormElement | null { return this.internals.form; }
  formDisabledCallback(disabled: boolean): void { this.disabled = disabled; }
  formResetCallback(): void { this.checked = false; this.syncForm(); }
  formStateRestoreCallback(state: File | FormData | string | null): void { this.checked = state === this.value; this.syncForm(); }
  protected override updated(): void { this.syncForm(); }

  private onChange = (event: Event): void => {
    this.checked = (event.currentTarget as HTMLInputElement).checked;
    this.syncForm();
    this.dispatchRainbowEvent('rainbow-change', { value: this.checked ? this.value : '', checked: this.checked });
  };
  private syncForm(): void { this.internals.setFormValue(this.checked ? this.value : null); this.internals.setValidity({}); }
}

export function defineRainbowSwitch(): void {
  if (!customElements.get('rainbow-switch')) customElements.define('rainbow-switch', RainbowSwitch);
}
