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
