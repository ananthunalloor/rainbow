import { css, html } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

/** Wrapper around native <details>/<summary> for accessible disclosure groups. */
export class RainbowAccordion extends RainbowElement {
  static override properties = {
    allowMultiple: { type: Boolean, attribute: 'allow-multiple', reflect: true },
  };

  static override styles = css`
    :host { display: block; color: var(--rainbow-color-text, #0f172a); }
    ::slotted(details) { border-block-end: 1px solid var(--rainbow-color-border, #cbd5e1); }
    ::slotted(details:first-child) { border-block-start: 1px solid var(--rainbow-color-border, #cbd5e1); }
    /* Native details/summary preserve browser keyboard and disclosure semantics. */
    ::slotted(details) { padding-inline: .25rem; }
    ::slotted(details[open]) { padding-block-end: .75rem; }
  `;

  allowMultiple = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('toggle', this.onToggle, true);
  }

  disconnectedCallback(): void {
    this.removeEventListener('toggle', this.onToggle, true);
    super.disconnectedCallback();
  }

  protected override render() {
    return html`<slot @slotchange=${this.normalizeExclusiveState}></slot>`;
  }

  private get items(): HTMLDetailsElement[] {
    return [...this.children].filter((child): child is HTMLDetailsElement => child instanceof HTMLDetailsElement);
  }

  protected override updated(): void {
    this.normalizeExclusiveState();
  }

  private normalizeExclusiveState = (): void => {
    if (this.allowMultiple) return;
    let foundOpen = false;
    for (const item of this.items) {
      if (!item.open) continue;
      if (foundOpen) item.open = false;
      else foundOpen = true;
    }
  };

  private onToggle = (event: Event): void => {
    const item = event.target;
    if (!(item instanceof HTMLDetailsElement) || !this.items.includes(item)) return;
    if (item.open && !this.allowMultiple) {
      for (const sibling of this.items) {
        if (sibling !== item && sibling.open) sibling.open = false;
      }
    }
    this.dispatchRainbowEvent('rainbow-change', {
      open: item.open,
      item,
      openItems: this.items.filter((candidate) => candidate.open),
    });
  };
}

export function defineRainbowAccordion(): void {
  if (!customElements.get('rainbow-accordion')) customElements.define('rainbow-accordion', RainbowAccordion);
}
