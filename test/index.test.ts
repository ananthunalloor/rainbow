import { describe, expect, it } from 'vitest';

import { RainbowButton, RainbowInput } from '../src/index.js';
import { RainbowCheckbox, RainbowSelect, RainbowTextarea } from '../src/index.js';
import { installRainbowTheme, setRainbowTheme } from '../src/theme/index.js';

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
