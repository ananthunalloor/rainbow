import type { Preview } from '@storybook/web-components-vite';
import { html } from 'lit';

// Call registration functions directly instead of importing a side-effect-only entrypoint.
// This prevents Vite/Rollup tree-shaking from removing registration/theme setup in builds.
import { defineRainbowComponents } from '../src/components/index.js';
import { installRainbowTheme } from '../src/theme/index.js';

defineRainbowComponents();
installRainbowTheme();

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Rainbow theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (story, context) => {
      const mode = context.globals.theme as 'light' | 'dark' | 'system';
      document.documentElement.setAttribute('data-rainbow-theme', mode);
      return html`<main style="min-height: 100vh; padding: 2rem; box-sizing: border-box; background: var(--rainbow-color-background); color: var(--rainbow-color-text); font-family: var(--rainbow-font-family);">${story()}</main>`;
    },
  ],
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
    a11y: { test: 'todo' },
  },
};

export default preview;
