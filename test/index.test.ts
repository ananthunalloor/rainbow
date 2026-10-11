import { describe, expect, it } from 'vitest';

import {
  RainbowButton,
  RainbowCheckbox,
  RainbowInput,
  RainbowSelect,
  RainbowTextarea,
} from '../src/index.js';
import { defineRainbowComponents } from '../src/components/index.js';
import { installRainbowTheme, setRainbowTheme } from '../src/theme/index.js';

describe('Rainbow custom-element registration', () => {
  it('registers every public element and tolerates repeated registration', () => {
    const tags = [
      'rainbow-accordion', 'rainbow-alert', 'rainbow-button', 'rainbow-checkbox',
      'rainbow-context-menu', 'rainbow-dialog', 'rainbow-dropdown', 'rainbow-field',
      'rainbow-form', 'rainbow-input', 'rainbow-menu', 'rainbow-popover', 'rainbow-radio',
      'rainbow-radio-group', 'rainbow-select', 'rainbow-switch', 'rainbow-tabs',
      'rainbow-textarea', 'rainbow-tooltip',
    ];

    defineRainbowComponents();
    defineRainbowComponents();

    for (const tag of tags) {
      expect(customElements.get(tag), `${tag} should be registered`).toBeDefined();
    }
  });
});

describe('Rainbow foundation', () => {
  it('exports the core element classes', () => {
    expect(RainbowButton).toBeDefined();
    expect(RainbowInput).toBeDefined();
  });

  it('installs and switches the global theme', () => {
    const style = installRainbowTheme(document, 'light');

    expect(style.id).toBe('rainbow-theme-styles');
    expect(style.textContent).toContain('--rainbow-color-primary');
    expect(document.documentElement.dataset.rainbowTheme).toBe('light');

    setRainbowTheme('dark');
    expect(document.documentElement.dataset.rainbowTheme).toBe('dark');
  });

  it('renders and emits stable events for rainbow-button', async () => {
    if (!customElements.get('rainbow-button')) {
      customElements.define('rainbow-button', RainbowButton);
    }

    const button = document.createElement('rainbow-button');
    button.textContent = 'Save';

    let activated = false;
    button.addEventListener('rainbow-activate', () => {
      activated = true;
    });

    document.body.append(button);
    await button.updateComplete;

    const internalButton = button.shadowRoot?.querySelector('button');
    expect(internalButton).not.toBeNull();
    internalButton?.click();
    expect(activated).toBe(true);

    button.remove();
  });
});

describe('Rainbow P0 form controls', () => {
  it('exports the P0 form controls', () => {
    expect(RainbowCheckbox).toBeDefined();
    expect(RainbowSelect).toBeDefined();
    expect(RainbowTextarea).toBeDefined();
  });

  it('associates checkbox state with FormData', async () => {
    for (const [tag, ctor] of [
      ['rainbow-checkbox', RainbowCheckbox],
      ['rainbow-select', RainbowSelect],
      ['rainbow-textarea', RainbowTextarea],
    ] as const) {
      if (!customElements.get(tag)) customElements.define(tag, ctor);
    }

    const form = document.createElement('form');
    const checkbox = document.createElement('rainbow-checkbox');
    checkbox.setAttribute('name', 'terms');
    checkbox.setAttribute('value', 'accepted');
    checkbox.checked = true;
    form.append(checkbox);
    document.body.append(form);
    await checkbox.updateComplete;

    expect(new FormData(form).get('terms')).toBe('accepted');
    form.remove();
  });
});

describe('Rainbow overlay infrastructure', () => {
  it('restores focus when a menu closes', async () => {
    if (!customElements.get('rainbow-menu')) {
      const { RainbowMenu } = await import('../src/components/menu.js');
      customElements.define('rainbow-menu', RainbowMenu);
    }

    const trigger = document.createElement('button');
    const menu = document.createElement('rainbow-menu');
    menu.innerHTML = '<button role="menuitem">First</button><button role="menuitem">Second</button>';
    document.body.append(trigger, menu);
    trigger.focus();
    await menu.updateComplete;

    menu.show();
    await menu.updateComplete;
    await Promise.resolve();

    const items = menu.querySelectorAll<HTMLElement>('[role="menuitem"]');
    expect(items[0]?.tabIndex).toBe(0);
    expect(items[1]?.tabIndex).toBe(-1);
    expect(document.activeElement).toBe(items[0]);

    items[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(items[1]);
    expect(items[0]?.tabIndex).toBe(-1);
    expect(items[1]?.tabIndex).toBe(0);

    menu.hide();
    expect(document.activeElement).toBe(trigger);
    menu.remove();
    trigger.remove();
  });

  it('supports Home, End, wrapping and Escape for menu navigation', async () => {
    const menu = document.createElement('rainbow-menu');
    menu.innerHTML =
      '<button role="menuitem">One</button><button role="menuitem">Two</button><button role="menuitem">Three</button>';
    document.body.append(menu);
    await menu.updateComplete;

    menu.show();
    await menu.updateComplete;
    await Promise.resolve();

    const items = [...menu.querySelectorAll<HTMLElement>('[role="menuitem"]')];
    items[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(items[2]);

    items[2]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(document.activeElement).toBe(items[0]);

    items[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(document.activeElement).toBe(items[2]);

    items[2]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(menu.open).toBe(false);
    menu.remove();
  });

  it('lets the topmost overlay own Escape and outside pointer handling', async () => {
    if (!customElements.get('rainbow-popover')) {
      const { RainbowPopover } = await import('../src/components/popover.js');
      customElements.define('rainbow-popover', RainbowPopover);
    }
    if (!customElements.get('rainbow-menu')) {
      const { RainbowMenu } = await import('../src/components/menu.js');
      customElements.define('rainbow-menu', RainbowMenu);
    }

    const popover = document.createElement('rainbow-popover');
    const menu = document.createElement('rainbow-menu');
    menu.innerHTML = '<button role="menuitem">Item</button>';
    document.body.append(popover, menu);
    await popover.updateComplete;
    await menu.updateComplete;

    popover.show();
    menu.show();
    expect(popover.open).toBe(true);
    expect(menu.open).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(menu.open).toBe(false);
    expect(popover.open).toBe(true);

    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(popover.open).toBe(false);

    popover.remove();
    menu.remove();
  });
});

describe('Rainbow positioning and extended menus', () => {
  it('exports dropdown and context menu components', async () => {
    const { RainbowDropdown } = await import('../src/components/dropdown.js');
    const { RainbowContextMenu } = await import('../src/components/context-menu.js');
    expect(RainbowDropdown).toBeDefined();
    expect(RainbowContextMenu).toBeDefined();
  });

  it('positions a floating panel within the viewport', async () => {
    const { positionRainbowFloatingElement } = await import('../src/core/positioning.js');
    const anchor = document.createElement('div');
    const floating = document.createElement('div');
    document.body.append(anchor, floating);
    anchor.getBoundingClientRect = () => new DOMRect(280, 170, 30, 20);
    floating.getBoundingClientRect = () => new DOMRect(0, 0, 100, 80);
    positionRainbowFloatingElement(anchor, floating, { placement: 'bottom-start' });
    expect(floating.style.position).toBe('fixed');
    expect(Number.parseInt(floating.style.left, 10)).toBeGreaterThanOrEqual(8);
    expect(Number.parseInt(floating.style.top, 10)).toBeGreaterThanOrEqual(8);
    anchor.remove(); floating.remove();
  });

  it('opens dropdowns and exposes the menu role', async () => {
    const { RainbowDropdown } = await import('../src/components/dropdown.js');
    if (!customElements.get('rainbow-dropdown')) customElements.define('rainbow-dropdown', RainbowDropdown);
    const dropdown = document.createElement('rainbow-dropdown');
    dropdown.innerHTML = '<button role="menuitem">Edit</button><button role="menuitem">Delete</button>';
    document.body.append(dropdown);
    await dropdown.updateComplete;
    dropdown.show();
    await dropdown.updateComplete;
    expect(dropdown.shadowRoot?.querySelector('[role="menu"]')).not.toBeNull();
    expect(dropdown.open).toBe(true);
    dropdown.hide(false);
    dropdown.remove();
  });

  it('flips bottom placements above the anchor when the viewport has insufficient room', async () => {
    const { positionRainbowFloatingElement } = await import('../src/core/positioning.js');
    const anchor = document.createElement('div');
    const floating = document.createElement('div');
    document.body.append(anchor, floating);
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
    anchor.getBoundingClientRect = () => new DOMRect(40, viewportHeight - 25, 30, 20);
    floating.getBoundingClientRect = () => new DOMRect(0, 0, 100, 90);

    positionRainbowFloatingElement(anchor, floating, { placement: 'bottom-start' });

    expect(Number.parseFloat(floating.style.top)).toBeLessThan(viewportHeight - 25);
    anchor.remove();
    floating.remove();
  });

  it('respects logical start alignment when the direction is RTL', async () => {
    const { positionRainbowFloatingElement } = await import('../src/core/positioning.js');
    const anchor = document.createElement('div');
    const floating = document.createElement('div');
    document.body.append(anchor, floating);
    anchor.getBoundingClientRect = () => new DOMRect(100, 100, 30, 20);
    floating.getBoundingClientRect = () => new DOMRect(0, 0, 80, 40);

    positionRainbowFloatingElement(anchor, floating, { placement: 'bottom-start', direction: 'ltr' });
    const ltrLeft = Number.parseFloat(floating.style.left);
    positionRainbowFloatingElement(anchor, floating, { placement: 'bottom-start', direction: 'rtl' });
    const rtlLeft = Number.parseFloat(floating.style.left);

    expect(ltrLeft).toBe(100);
    expect(rtlLeft).toBe(50);
    anchor.remove();
    floating.remove();
  });

  it('flips side placements when the preferred side overflows', async () => {
    const { positionRainbowFloatingElement } = await import('../src/core/positioning.js');
    const anchor = document.createElement('div');
    const floating = document.createElement('div');
    document.body.append(anchor, floating);
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    anchor.getBoundingClientRect = () => new DOMRect(viewportWidth - 10, 100, 10, 20);
    floating.getBoundingClientRect = () => new DOMRect(0, 0, 120, 60);

    positionRainbowFloatingElement(anchor, floating, { placement: 'right-start' });

    expect(Number.parseFloat(floating.style.left)).toBeLessThan(viewportWidth - 10);
    expect(floating.style.position).toBe('fixed');
    anchor.remove();
    floating.remove();
  });
});

describe('Lit reactive-property compatibility', () => {
  it('updates a rainbow-dialog when reactive class fields are assigned', async () => {
    const { RainbowDialog } = await import('../src/components/dialog.js');
    if (!customElements.get('rainbow-dialog')) {
      customElements.define('rainbow-dialog', RainbowDialog);
    }

    const dialog = document.createElement('rainbow-dialog') as InstanceType<typeof RainbowDialog>;
    document.body.append(dialog);
    await dialog.updateComplete;

    dialog.label = 'Updated dialog title';
    await dialog.updateComplete;

    expect(dialog.shadowRoot?.querySelector('h2')?.textContent).toBe('Updated dialog title');
    expect(dialog.getAttribute('label')).toBe('Updated dialog title');

    dialog.open = true;
    dialog.modal = false;
    await dialog.updateComplete;
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.hasAttribute('modal')).toBe(false);

    dialog.remove();
  });

  it('registers all implemented custom elements through the auto entrypoint', async () => {
    await import('../src/auto.js');
    const implementedTags = [
      'rainbow-accordion',
      'rainbow-alert',
      'rainbow-button',
      'rainbow-checkbox',
      'rainbow-context-menu',
      'rainbow-dialog',
      'rainbow-dropdown',
      'rainbow-field',
      'rainbow-form',
      'rainbow-input',
      'rainbow-menu',
      'rainbow-popover',
      'rainbow-radio',
      'rainbow-radio-group',
      'rainbow-select',
      'rainbow-switch',
      'rainbow-tabs',
      'rainbow-textarea',
      'rainbow-tooltip',
    ];

    for (const tag of implementedTags) {
      expect(customElements.get(tag), `${tag} should be registered`).toBeDefined();
    }
  });
});


describe('Rainbow disclosure and status components', () => {
  it('registers and renders tabs, accordion, and alert', async () => {
    const { RainbowTabs } = await import('../src/components/tabs.js');
    const { RainbowAccordion } = await import('../src/components/accordion.js');
    const { RainbowAlert } = await import('../src/components/alert.js');
    if (!customElements.get('rainbow-tabs')) customElements.define('rainbow-tabs', RainbowTabs);
    if (!customElements.get('rainbow-accordion')) customElements.define('rainbow-accordion', RainbowAccordion);
    if (!customElements.get('rainbow-alert')) customElements.define('rainbow-alert', RainbowAlert);

    const tabs = document.createElement('rainbow-tabs') as InstanceType<typeof RainbowTabs>;
    tabs.innerHTML = '<button slot="tab">First</button><button slot="tab">Second</button><section slot="panel">First panel</section><section slot="panel">Second panel</section>';
    const accordion = document.createElement('rainbow-accordion');
    accordion.innerHTML = '<details open><summary>One</summary><p>One body</p></details><details><summary>Two</summary><p>Two body</p></details>';
    const alert = document.createElement('rainbow-alert') as InstanceType<typeof RainbowAlert>;
    alert.setAttribute('dismissible', '');
    alert.textContent = 'Saved';
    let dismissedEvent = false;
    alert.addEventListener('rainbow-dismiss', () => { dismissedEvent = true; });
    document.body.append(tabs, accordion, alert);
    await Promise.all([tabs.updateComplete, accordion.updateComplete, alert.updateComplete]);
    await Promise.resolve();

    expect(tabs.querySelector('[slot="tab"]')?.getAttribute('role')).toBe('tab');
    expect(tabs.querySelector('[slot="panel"]')?.getAttribute('role')).toBe('tabpanel');
    expect(tabs.querySelectorAll('[slot="panel"][hidden]')).toHaveLength(1);
    expect(alert.shadowRoot?.querySelector('[role="status"]')).not.toBeNull();
    expect(accordion.querySelectorAll('details[open]')).toHaveLength(1);

    const tabElements = [...tabs.querySelectorAll<HTMLElement>('[slot="tab"]')];
    tabElements[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(tabs.selectedIndex).toBe(1);
    expect(tabElements[1]?.getAttribute('aria-selected')).toBe('true');

    alert.shadowRoot?.querySelector<HTMLButtonElement>('button.dismiss')?.click();
    await alert.updateComplete;
    expect(alert.dismissed).toBe(true);
    expect(dismissedEvent).toBe(true);
    expect(alert.shadowRoot?.querySelector('.alert')).toBeNull();

    tabs.remove();
    accordion.remove();
    alert.remove();
  });

  it('supports manual tab activation', async () => {
    const { RainbowTabs } = await import('../src/components/tabs.js');
    if (!customElements.get('rainbow-tabs')) customElements.define('rainbow-tabs', RainbowTabs);
    const tabs = document.createElement('rainbow-tabs') as InstanceType<typeof RainbowTabs>;
    tabs.activation = 'manual';
    tabs.innerHTML = '<button slot="tab">One</button><button slot="tab">Two</button><section slot="panel">One</section><section slot="panel">Two</section>';
    document.body.append(tabs);
    await tabs.updateComplete;
    await Promise.resolve();

    const tabElements = [...tabs.querySelectorAll<HTMLElement>('[slot="tab"]')];
    tabElements[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(tabs.selectedIndex).toBe(0);
    expect(document.activeElement).toBe(tabElements[1]);
    tabElements[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(tabs.selectedIndex).toBe(1);
    expect(tabElements[1]?.getAttribute('aria-selected')).toBe('true');
    tabs.remove();
  });

  it('allows multiple accordion sections when configured', async () => {
    const { RainbowAccordion } = await import('../src/components/accordion.js');
    if (!customElements.get('rainbow-accordion')) customElements.define('rainbow-accordion', RainbowAccordion);
    const accordion = document.createElement('rainbow-accordion') as InstanceType<typeof RainbowAccordion>;
    accordion.allowMultiple = true;
    accordion.innerHTML = '<details open><summary>One</summary></details><details open><summary>Two</summary></details>';
    document.body.append(accordion);
    await accordion.updateComplete;
    expect(accordion.querySelectorAll('details[open]')).toHaveLength(2);
    accordion.remove();
  });
});


describe('Rainbow accessibility interaction behavior', () => {
  it('updates tab selection and panel visibility after arrow navigation', async () => {
    const { RainbowTabs } = await import('../src/components/tabs.js');
    if (!customElements.get('rainbow-tabs')) customElements.define('rainbow-tabs', RainbowTabs);

    const tabs = document.createElement('rainbow-tabs') as InstanceType<typeof RainbowTabs>;
    tabs.innerHTML = `
      <button slot="tab">Overview</button><button slot="tab">API</button>
      <section slot="panel">Overview panel</section><section slot="panel">API panel</section>
    `;
    document.body.append(tabs);
    await tabs.updateComplete;
    const tabButtons = [...tabs.querySelectorAll<HTMLElement>('[slot="tab"]')];
    const panels = [...tabs.querySelectorAll<HTMLElement>('[slot="panel"]')];

    expect(tabButtons[0]?.getAttribute('aria-selected')).toBe('true');
    expect(panels[0]?.hidden).toBe(false);
    expect(panels[1]?.hidden).toBe(true);

    tabButtons[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await tabs.updateComplete;
    expect(tabs.selectedIndex).toBe(1);
    expect(tabButtons[1]?.getAttribute('aria-selected')).toBe('true');
    expect(panels[0]?.hidden).toBe(true);
    expect(panels[1]?.hidden).toBe(false);
    tabs.remove();
  });

  it('normalizes initially open accordion items to one item by default', async () => {
    const { RainbowAccordion } = await import('../src/components/accordion.js');
    if (!customElements.get('rainbow-accordion')) customElements.define('rainbow-accordion', RainbowAccordion);

    const accordion = document.createElement('rainbow-accordion');
    accordion.innerHTML = '<details open><summary>One</summary><p>One</p></details><details open><summary>Two</summary><p>Two</p></details>';
    document.body.append(accordion);
    await accordion.updateComplete;
    const items = [...accordion.querySelectorAll<HTMLDetailsElement>('details')];
    expect(items.filter((item) => item.open)).toHaveLength(1);
    accordion.remove();
  });

  it('dismisses an alert and emits rainbow-dismiss', async () => {
    const { RainbowAlert } = await import('../src/components/alert.js');
    if (!customElements.get('rainbow-alert')) customElements.define('rainbow-alert', RainbowAlert);

    const alert = document.createElement('rainbow-alert') as InstanceType<typeof RainbowAlert>;
    alert.dismissible = true;
    alert.textContent = 'This can be dismissed';
    let dismissed = false;
    alert.addEventListener('rainbow-dismiss', () => { dismissed = true; });
    document.body.append(alert);
    await alert.updateComplete;

    alert.shadowRoot?.querySelector<HTMLButtonElement>('.dismiss')?.click();
    await alert.updateComplete;
    expect(dismissed).toBe(true);
    expect(alert.shadowRoot?.querySelector('.alert')).toBeNull();
    alert.remove();
  });
});
