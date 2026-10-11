import { css, html, type PropertyValues } from 'lit';

import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowSelect extends RainbowElement {
  static formAssociated = true;
  static override properties = {
    label: { reflect: true },
    description: { reflect: true },
    error: { reflect: true },
    name: { reflect: true },
    value: {},
    required: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
  };

  static override styles = css`
    :host { display: block; color: var(--rainbow-color-text, #0f172a); font: var(--rainbow-font-size-md, 1rem) / var(--rainbow-line-height, 1.5) var(--rainbow-font-family, system-ui, sans-serif); }
    .field { display: grid; gap: 0.375rem; }
    label { font-weight: 600; }
    select { min-block-size: 2.75rem; inline-size: 100%; padding: 0.625rem 0.75rem; border: 1px solid var(--rainbow-color-border, #cbd5e1); border-radius: var(--rainbow-radius-md, 0.5rem); color: var(--rainbow-color-text, #0f172a); background: var(--rainbow-color-surface, #fff); font: inherit; }
    select:focus-visible { outline: 3px solid var(--rainbow-color-focus-ring, #6d5efc); outline-offset: 1px; border-color: var(--rainbow-color-focus-ring, #6d5efc); }
    select:disabled { cursor: not-allowed; opacity: 0.6; }
    .description, .error { font-size: var(--rainbow-font-size-sm, 0.875rem); }
    .description { color: var(--rainbow-color-text-muted, #64748b); }
    .error { color: var(--rainbow-color-danger, #dc2626); }
  `;

  label = '';
  description = '';
  error = '';
  name = '';
  value = '';
  required = false;
  disabled = false;
  private readonly internals = this.attachInternals();
  private readonly controlId = `rainbow-select-${crypto.randomUUID()}`;
  private readonly descriptionId = `${this.controlId}-description`;
  private readonly errorId = `${this.controlId}-error`;

  protected override render() {
    const describedBy = [this.description ? this.descriptionId : '', this.error ? this.errorId : ''].filter(Boolean).join(' ') || undefined;
    return html`<div class="field">${this.label ? html`<label for=${this.controlId}>${this.label}${this.required ? ' *' : ''}</label>` : ''}<select id=${this.controlId} part="select" .value=${this.value} ?required=${this.required} ?disabled=${this.disabled} aria-describedby=${describedBy} aria-invalid=${this.error ? 'true' : 'false'} @change=${this.handleChange}><slot></slot></select>${this.description ? html`<div id=${this.descriptionId} class="description">${this.description}</div>` : ''}${this.error ? html`<div id=${this.errorId} class="error" role="alert">${this.error}</div>` : ''}</div>`;
  }

  protected override updated(changed: PropertyValues<this>): void { if (changed.has('value') || changed.has('required') || changed.has('disabled') || changed.has('error')) this.syncFormState(); }
  override focus(options?: FocusOptions): void { this.shadowRoot?.querySelector('select')?.focus(options); }
  checkValidity(): boolean { return this.internals.checkValidity(); }
  reportValidity(): boolean { return this.internals.reportValidity(); }
  get form(): HTMLFormElement | null { return this.internals.form; }
  formDisabledCallback(disabled: boolean): void { this.disabled = disabled; }
  formResetCallback(): void { this.value = ''; this.syncFormState(); }
  formStateRestoreCallback(state: File | FormData | string | null): void { if (typeof state === 'string') this.value = state; }

  private handleChange = (event: Event): void => {
    this.value = (event.currentTarget as HTMLSelectElement).value;
    this.syncFormState(event.currentTarget as HTMLSelectElement);
    this.dispatchRainbowEvent('rainbow-change', { value: this.value });
  };

  private syncFormState(control = this.shadowRoot?.querySelector<HTMLSelectElement>('select')): void {
    if (!control) return;
    this.internals.setFormValue(this.value);
    if (this.error) this.internals.setValidity({ customError: true }, this.error, control);
    else if (control.validity.valueMissing) this.internals.setValidity({ valueMissing: true }, control.validationMessage, control);
    else this.internals.setValidity({});
  }
}

export function defineRainbowSelect(): void { if (!customElements.get('rainbow-select')) customElements.define('rainbow-select', RainbowSelect); }
