import { css, html, nothing } from 'lit';
import { RainbowElement } from '../core/rainbow-element.js';

export type RainbowTabsOrientation = 'horizontal' | 'vertical';
export type RainbowTabsActivation = 'automatic' | 'manual';

let tabsInstanceCount = 0;

/** Accessible tabs built around slotted, light-DOM tab and panel elements. */
export class RainbowTabs extends RainbowElement {
  static override properties = {
    label: { type: String },
    selectedIndex: { type: Number, attribute: 'selected-index', reflect: true },
    orientation: { type: String, reflect: true },
    activation: { type: String, reflect: true },
  };

  static override styles = css`
    :host { display: block; color: var(--rainbow-color-text, #0f172a); }
    .tablist { display: flex; gap: .25rem; border-block-end: 1px solid var(--rainbow-color-border, #cbd5e1); }
    :host([orientation='vertical']) .tablist { flex-direction: column; border-block-end: 0; border-inline-end: 1px solid var(--rainbow-color-border, #cbd5e1); }
    .layout { display: grid; gap: 1rem; }
    :host([orientation='vertical']) .layout { grid-template-columns: minmax(8rem, auto) minmax(0, 1fr); }
    ::slotted([slot='tab']) { appearance: none; border: 0; border-block-end: 2px solid transparent; background: transparent; color: inherit; cursor: pointer; font: inherit; padding: .7rem 1rem; text-align: start; }
    :host([orientation='vertical']) ::slotted([slot='tab']) { border-block-end: 0; border-inline-end: 2px solid transparent; }
    ::slotted([slot='tab'][aria-selected='true']) { border-color: var(--rainbow-color-primary, #4f46e5); color: var(--rainbow-color-primary, #4f46e5); font-weight: 650; }
    ::slotted([slot='tab']:focus-visible) { outline: 2px solid var(--rainbow-color-focus, #6366f1); outline-offset: -2px; border-radius: var(--rainbow-radius-sm, .25rem); }
    ::slotted([slot='panel']) { min-width: 0; padding-block: .75rem; }
    ::slotted([slot='panel'][hidden]) { display: none !important; }
    @media (prefers-reduced-motion: no-preference) { ::slotted([slot='tab']) { transition: color .12s ease, border-color .12s ease; } }
  `;

  label = 'Tabs';
  selectedIndex = 0;
  orientation: RainbowTabsOrientation = 'horizontal';
  activation: RainbowTabsActivation = 'automatic';

  private readonly instanceId = ++tabsInstanceCount;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKeydown);
    super.disconnectedCallback();
  }

  protected override firstUpdated(): void {
    this.syncTabs();
  }

  protected override updated(): void {
    this.syncTabs();
  }

  protected override render() {
    return html`
      <div class="layout">
        <div class="tablist" role="tablist" aria-label=${this.label || nothing} aria-orientation=${this.orientation}>
          <slot name="tab" @slotchange=${this.syncTabs}></slot>
        </div>
        <div class="panels"><slot name="panel" @slotchange=${this.syncTabs}></slot></div>
      </div>
    `;
  }

  private get tabs(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>("[slot='tab']")];
  }

  private get panels(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLElement>("[slot='panel']")];
  }

  private syncTabs = (): void => {
    const tabs = this.tabs;
    const panels = this.panels;
    if (!tabs.length) return;

    const selected = Math.min(Math.max(Number.isFinite(this.selectedIndex) ? this.selectedIndex : 0, 0), tabs.length - 1);
    if (selected !== this.selectedIndex) this.selectedIndex = selected;

    tabs.forEach((tab, index) => {
      if (!tab.id) tab.id = `rainbow-tabs-${this.instanceId}-tab-${index + 1}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(index === selected));
      tab.tabIndex = index === selected ? 0 : -1;
      const panel = panels[index];
      if (panel) {
        if (!panel.id) panel.id = `rainbow-tabs-${this.instanceId}-panel-${index + 1}`;
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.id);
        panel.hidden = index !== selected;
        if (!panel.hasAttribute('tabindex')) panel.tabIndex = 0;
      } else {
        tab.removeAttribute('aria-controls');
      }
    });

    panels.forEach((panel, index) => {
      panel.hidden = index !== selected;
      if (tabs[index]) {
        panel.setAttribute('role', 'tabpanel');
        const tab = tabs[index];
        if (tab) panel.setAttribute('aria-labelledby', tab.id);
      }
    });
  };

  private onClick = (event: Event): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const tab = target.closest<HTMLElement>("[slot='tab']");
    if (!tab || !this.tabs.includes(tab)) return;
    this.select(this.tabs.indexOf(tab), false);
  };

  private onKeydown = (event: KeyboardEvent): void => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const tab = target.closest<HTMLElement>("[slot='tab']");
    if (!tab) return;
    const tabs = this.tabs;
    const current = tabs.indexOf(tab);
    if (current < 0 || tabs.length === 0) return;

    let next = current;
    const rtl = this.orientation === 'horizontal' && getComputedStyle(this).direction === 'rtl';
    const previousKey = this.orientation === 'vertical' ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = this.orientation === 'vertical' ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === previousKey) next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === nextKey) next = (current + 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (this.activation === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.select(current, true);
      return;
    } else return;

    event.preventDefault();
    tabs[next]?.focus({ preventScroll: true });
    if (this.activation === 'automatic') this.select(next, false);
  };

  private select(index: number, focus: boolean): void {
    const tabs = this.tabs;
    if (index < 0 || index >= tabs.length || index === this.selectedIndex) {
      if (focus) tabs[index]?.focus({ preventScroll: true });
      return;
    }
    this.selectedIndex = index;
    this.syncTabs();
    if (focus) tabs[index]?.focus({ preventScroll: true });
    this.dispatchRainbowEvent('rainbow-change', { selectedIndex: index, tab: tabs[index] });
  }
}

export function defineRainbowTabs(): void {
  if (!customElements.get('rainbow-tabs')) customElements.define('rainbow-tabs', RainbowTabs);
}
