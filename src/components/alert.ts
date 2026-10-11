import { css, html, nothing } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export type RainbowAlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type RainbowAlertLive = 'polite' | 'assertive' | 'off';

/** Status/alert region with optional dismissal and a stable DOM event contract. */
export class RainbowAlert extends RainbowElement {
  static override properties = {
    variant: { type: String, reflect: true },
    dismissible: { type: Boolean, reflect: true },
    live: { type: String, reflect: true },
    dismissed: { type: Boolean, state: true },
  };

  static override styles = css`
    :host { display: block; }
    .alert { display: flex; align-items: start; gap: .75rem; border: 1px solid var(--alert-border); border-inline-start-width: .25rem; border-radius: var(--rainbow-radius-md, .5rem); padding: .875rem 1rem; background: var(--alert-bg); color: var(--alert-text); }
    .content { flex: 1; min-width: 0; }
    .title { font-weight: 700; margin: 0 0 .25rem; }
    .message { margin: 0; }
    .dismiss { appearance: none; border: 0; border-radius: .25rem; background: transparent; color: inherit; cursor: pointer; font: inherit; line-height: 1; padding: .2rem .35rem; }
    .dismiss:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
    :host([variant='info']) { --alert-bg: var(--rainbow-color-info-subtle, #eff6ff); --alert-border: var(--rainbow-color-info, #2563eb); --alert-text: var(--rainbow-color-info-text, #1e3a8a); }
    :host([variant='success']) { --alert-bg: var(--rainbow-color-success-subtle, #f0fdf4); --alert-border: var(--rainbow-color-success, #15803d); --alert-text: var(--rainbow-color-success-text, #14532d); }
    :host([variant='warning']) { --alert-bg: var(--rainbow-color-warning-subtle, #fffbeb); --alert-border: var(--rainbow-color-warning, #b45309); --alert-text: var(--rainbow-color-warning-text, #78350f); }
    :host([variant='danger']) { --alert-bg: var(--rainbow-color-danger-subtle, #fef2f2); --alert-border: var(--rainbow-color-danger, #b91c1c); --alert-text: var(--rainbow-color-danger-text, #7f1d1d); }
    @media (forced-colors: active) { .alert { border: 1px solid CanvasText; border-inline-start-width: .25rem; } }
  `;

  variant: RainbowAlertVariant = 'info';
  dismissible = false;
  live: RainbowAlertLive = 'polite';
  dismissed = false;

  protected override render() {
    if (this.dismissed) return nothing;
    const role = this.live === 'assertive' ? 'alert' : this.live === 'polite' ? 'status' : 'group';
    return html`
      <div class="alert" role=${role} aria-live=${this.live === 'off' ? 'off' : this.live}>
        <div class="content">
          ${this.querySelector('[slot="title"]') ? html`<p class="title"><slot name="title"></slot></p>` : nothing}
          <div class="message"><slot></slot></div>
        </div>
        ${this.dismissible ? html`<button class="dismiss" type="button" aria-label="Dismiss alert" @click=${this.dismiss}>×</button>` : nothing}
      </div>
    `;
  }

  dismiss = (): void => {
    if (this.dismissed) return;
    this.dismissed = true;
    this.dispatchRainbowEvent('rainbow-dismiss');
  };

  show(): void {
    this.dismissed = false;
  }
}

export function defineRainbowAlert(): void {
  if (!customElements.get('rainbow-alert')) customElements.define('rainbow-alert', RainbowAlert);
}
