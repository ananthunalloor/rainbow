import { css, html } from 'lit';

import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowCheckbox extends RainbowElement {
  static formAssociated = true;
  static override properties = {
    label: { reflect: true },
    description: { reflect: true },
    name: { reflect: true },
    value: { reflect: true },
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  static override styles = css`
    :host { display: block; color: var(--rainbow-color-text, #0f172a); font: var(--rainbow-font-size-md, 1rem) / var(--rainbow-line-height, 1.5) var(--rainbow-font-family, system-ui, sans-serif); }
    label { display: grid; grid-template-columns: auto 1fr; gap: 0.625rem; align-items: start; cursor: pointer; }
    input { inline-size: 1.125rem; block-size: 1.125rem; margin: 0.2rem 0 0; accent-color: var(--rainbow-color-primary, #7c3aed); }
    input:focus-visible { outline: 3px solid var(--rainbow-color-focus-ring, #6d5efc); outline-offset: 2px; }
    input:disabled, input:disabled + span { cursor: not-allowed; }
    input:disabled + span { opacity: 0.6; }
    .description { color: var(--rainbow-color-text-muted, #64748b); font-size: var(--rainbow-font-size-sm, 0.875rem); }
  `;

  label = '';
  description = '';
  name = '';
  value = 'on';
  checked = false;
  disabled = false;
  required = false;
  private readonly internals = this.attachInternals();
  private readonly controlId = `rainbow-checkbox-${crypto.randomUUID()}`;

  protected override render() {
    return html`<label for=${this.controlId}><input id=${this.controlId} part="control" type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} ?required=${this.required} @change=${this.handleChange} /><span><slot>${this.label}</slot>${this.description ? html`<span class="description">${this.description}</span>` : ''}</span></label>`;
  }

  override focus(options?: FocusOptions): void { this.shadowRoot?.querySelector('input')?.focus(options); }
  checkValidity(): boolean { return this.internals.checkValidity(); }
  reportValidity(): boolean { return this.internals.reportValidity(); }
  get form(): HTMLFormElement | null { return this.internals.form; }
  formDisabledCallback(disabled: boolean): void { this.disabled = disabled; }
  formResetCallback(): void { this.checked = false; this.syncFormState(); }
  formStateRestoreCallback(state: File | FormData | string | null): void { this.checked = state === this.value; }

  protected override updated(): void { this.syncFormState(); }

  private handleChange = (event: Event): void => {
    this.checked = (event.currentTarget as HTMLInputElement).checked;
    this.syncFormState();
    this.dispatchRainbowEvent('rainbow-change', { value: this.checked ? this.value : '' });
  };

  private syncFormState(): void {
    const control = this.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (!control) return;
    this.internals.setFormValue(this.checked ? this.value : null);
    if (this.required && !this.checked) this.internals.setValidity({ valueMissing: true }, 'Please select this option.', control);
    else this.internals.setValidity({});
  }
}

export function defineRainbowCheckbox(): void {
  if (!customElements.get('rainbow-checkbox')) customElements.define('rainbow-checkbox', RainbowCheckbox);
}
