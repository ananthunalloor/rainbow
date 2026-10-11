import { html, css } from 'lit';

import { RainbowElement } from '../core/rainbow-element.js';

export type RainbowButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type RainbowButtonSize = 'small' | 'medium' | 'large';
export type RainbowButtonType = 'button' | 'submit' | 'reset';

export class RainbowButton extends RainbowElement {
  static override properties = {
    variant: { reflect: true },
    size: { reflect: true },
    type: { reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { reflect: true },
    value: { reflect: true },
    form: { reflect: true },
  };

  static override styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    button {
      min-block-size: 2.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      border: 1px solid transparent;
      border-radius: var(--rainbow-radius-md, 0.5rem);
      font: 600 var(--rainbow-font-size-md, 1rem) / var(--rainbow-line-height, 1.5) var(
        --rainbow-font-family,
        system-ui,
        sans-serif
      );
      cursor: pointer;
      transition:
        background-color var(--rainbow-motion-duration-fast, 120ms) var(--rainbow-motion-easing-standard),
        border-color var(--rainbow-motion-duration-fast, 120ms) var(--rainbow-motion-easing-standard),
        box-shadow var(--rainbow-motion-duration-fast, 120ms) var(--rainbow-motion-easing-standard),
        transform var(--rainbow-motion-duration-fast, 120ms) var(--rainbow-motion-easing-standard);
    }

    button:focus-visible {
      outline: 3px solid var(--rainbow-color-focus-ring, #6d5efc);
      outline-offset: 2px;
    }

    button:active:not(:disabled) {
      transform: translateY(1px);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }

    :host([size='small']) button {
      min-block-size: 2rem;
      padding: 0.375rem 0.75rem;
      font-size: var(--rainbow-font-size-sm, 0.875rem);
    }

    :host([size='large']) button {
      min-block-size: 3rem;
      padding: 0.75rem 1.25rem;
      font-size: var(--rainbow-font-size-lg, 1.125rem);
    }

    :host([variant='primary']) button {
      color: var(--rainbow-color-primary-contrast, #fff);
      background: var(--rainbow-color-primary, #6d5efc);
    }

    :host([variant='primary']) button:hover:not(:disabled) {
      background: var(--rainbow-color-primary-hover, #5848e8);
    }

    :host([variant='primary']) button:active:not(:disabled) {
      background: var(--rainbow-color-primary-active, #4736c7);
    }

    :host([variant='secondary']) button {
      color: var(--rainbow-color-secondary-contrast, #fff);
      background: var(--rainbow-color-secondary, #0284c7);
    }

    :host([variant='secondary']) button:hover:not(:disabled) {
      background: var(--rainbow-color-secondary-hover, #0369a1);
    }

    :host([variant='secondary']) button:active:not(:disabled) {
      background: var(--rainbow-color-secondary-active, #075985);
    }

    :host([variant='ghost']) button {
      color: var(--rainbow-color-text, #0f172a);
      background: transparent;
      border-color: var(--rainbow-color-border, #cbd5e1);
    }

    :host([variant='ghost']) button:hover:not(:disabled) {
      background: var(--rainbow-color-surface-raised, #f8fafc);
    }

    :host([variant='danger']) button {
      color: var(--rainbow-color-danger-contrast, #fff);
      background: var(--rainbow-color-danger, #dc2626);
    }

    :host([variant='danger']) button:hover:not(:disabled) {
      filter: brightness(0.94);
    }
  `;

  variant: RainbowButtonVariant = 'primary';
  size: RainbowButtonSize = 'medium';
  type: RainbowButtonType = 'button';
  disabled = false;
  name = '';
  value = '';
  form = '';

  protected override render() {
    return html`
      <button
        part="button"
        type="button"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot name="icon-start"></slot>
        <slot></slot>
        <slot name="icon-end"></slot>
      </button>
    `;
  }

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) return;

    const shouldContinue = this.dispatchRainbowEvent(
      'rainbow-activate',
      {
        originalEvent: event,
        type: this.type,
      },
      { cancelable: true },
    );

    if (!shouldContinue) return;

    if (this.type === 'submit') {
      this.submitForm();
    } else if (this.type === 'reset') {
      this.getAssociatedForm()?.reset();
    }
  };

  private getAssociatedForm(): HTMLFormElement | null {
    if (this.form) {
      const form = document.getElementById(this.form);
      return form instanceof HTMLFormElement ? form : null;
    }

    return this.closest('form');
  }

  private submitForm(): void {
    const form = this.getAssociatedForm();
    if (!form) return;

    const submitter = document.createElement('button');
    submitter.type = 'submit';
    submitter.hidden = true;
    submitter.name = this.name;
    submitter.value = this.value;
    form.append(submitter);

    try {
      form.requestSubmit(submitter);
    } finally {
      submitter.remove();
    }
  }
}

export function defineRainbowButton(): void {
  if (!customElements.get('rainbow-button')) {
    customElements.define('rainbow-button', RainbowButton);
  }
}
