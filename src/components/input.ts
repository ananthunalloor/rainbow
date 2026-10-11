import { html, css, type PropertyValues } from 'lit';

import { RainbowElement } from '../core/rainbow-element.js';

export class RainbowInput extends RainbowElement {
  static formAssociated = true;

  static override properties = {
    label: { reflect: true },
    description: { reflect: true },
    error: { reflect: true },
    name: { reflect: true },
    value: {},
    type: { reflect: true },
    placeholder: {},
    autocomplete: { reflect: true },
    inputmode: { reflect: true },
    minlength: { type: Number, reflect: true },
    maxlength: { type: Number, reflect: true },
    pattern: { reflect: true },
    required: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
  };

  static override styles = css`
    :host {
      display: block;
      color: var(--rainbow-color-text, #0f172a);
      font: var(--rainbow-font-size-md, 1rem) / var(--rainbow-line-height, 1.5)
        var(--rainbow-font-family, system-ui, sans-serif);
    }

    .field {
      display: grid;
      gap: 0.375rem;
    }

    label {
      font-weight: 600;
    }

    input {
      min-block-size: 2.75rem;
      inline-size: 100%;
      padding: 0.625rem 0.75rem;
      border: 1px solid var(--rainbow-color-border, #cbd5e1);
      border-radius: var(--rainbow-radius-md, 0.5rem);
      color: var(--rainbow-color-text, #0f172a);
      background: var(--rainbow-color-surface, #fff);
      font: inherit;
    }

    input::placeholder {
      color: var(--rainbow-color-text-muted, #64748b);
    }

    input:focus-visible {
      outline: 3px solid var(--rainbow-color-focus-ring, #6d5efc);
      outline-offset: 1px;
      border-color: var(--rainbow-color-focus-ring, #6d5efc);
    }

    input:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .description,
    .error {
      font-size: var(--rainbow-font-size-sm, 0.875rem);
    }

    .description {
      color: var(--rainbow-color-text-muted, #64748b);
    }

    .error {
      color: var(--rainbow-color-danger, #dc2626);
    }
  `;

  label = '';
  description = '';
  error = '';
  name = '';
  value = '';
  type = 'text';
  placeholder = '';
  autocomplete = '';
  inputmode = '';
  minlength?: number;
  maxlength?: number;
  pattern = '';
  required = false;
  disabled = false;
  readonly = false;

  private readonly internals: ElementInternals = this.attachInternals();
  private readonly inputId = `rainbow-input-${crypto.randomUUID()}`;
  private readonly descriptionId = `${this.inputId}-description`;
  private readonly errorId = `${this.inputId}-error`;

  constructor() {
    super();
    this.tabIndex = -1;
  }

  override focus(options?: FocusOptions): void {
    const input = this.shadowRoot?.querySelector<HTMLInputElement>('input');
    input?.focus(options);
  }

  protected override render() {
    const describedBy = [this.description ? this.descriptionId : '', this.error ? this.errorId : '']
      .filter(Boolean)
      .join(' ') || undefined;

    return html`
      <div class="field">
        ${this.label
          ? html`<label for=${this.inputId}>${this.label}${this.required ? ' *' : ''}</label>`
          : ''}
        <input
          id=${this.inputId}
          part="input"
          .value=${this.value}
          type=${this.type}
          placeholder=${this.placeholder || undefined}
          autocomplete=${this.autocomplete || undefined}
          inputmode=${this.inputmode || undefined}
          minlength=${this.minlength}
          maxlength=${this.maxlength}
          pattern=${this.pattern || undefined}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-describedby=${describedBy}
          aria-invalid=${this.error ? 'true' : 'false'}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
        ${this.description ? html`<div id=${this.descriptionId} class="description">${this.description}</div>` : ''}
        ${this.error ? html`<div id=${this.errorId} class="error" role="alert">${this.error}</div>` : ''}
      </div>
    `;
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      changed.has('value') ||
      changed.has('disabled') ||
      changed.has('required') ||
      changed.has('type') ||
      changed.has('pattern') ||
      changed.has('minlength') ||
      changed.has('maxlength')
    ) {
      this.syncFormState();
    }
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  formResetCallback(): void {
    this.value = '';
    this.syncFormState();
  }

  formStateRestoreCallback(state: File | FormData | string | null): void {
    if (typeof state === 'string') {
      this.value = state;
    }
  }

  checkValidity(): boolean {
    return this.internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.internals.reportValidity();
  }

  get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  private handleInput = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement;
    this.value = input.value;
    this.syncFormState(input);
    this.dispatchRainbowEvent('rainbow-input', { value: this.value });
  };

  private handleChange = (): void => {
    this.dispatchRainbowEvent('rainbow-change', { value: this.value });
  };

  private syncFormState(input = this.shadowRoot?.querySelector<HTMLInputElement>('input')): void {
    if (!input) return;

    this.internals.setFormValue(this.value);

    const validity: ValidityStateFlags = {
      badInput: input.validity.badInput,
      customError: input.validity.customError || Boolean(this.error),
      patternMismatch: input.validity.patternMismatch,
      rangeOverflow: input.validity.rangeOverflow,
      rangeUnderflow: input.validity.rangeUnderflow,
      stepMismatch: input.validity.stepMismatch,
      tooLong: input.validity.tooLong,
      tooShort: input.validity.tooShort,
      typeMismatch: input.validity.typeMismatch,
      valueMissing: input.validity.valueMissing,
    };

    const hasError = Object.values(validity).some(Boolean);
    if (!hasError) {
      this.internals.setValidity({});
      return;
    }

    this.internals.setValidity(validity, this.error || input.validationMessage, input);
  }
}

export function defineRainbowInput(): void {
  if (!customElements.get('rainbow-input')) {
    customElements.define('rainbow-input', RainbowInput);
  }
}
