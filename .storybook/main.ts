import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Pin esbuild's class-field semantics here because Storybook's transform path
    // can differ from the normal Vite build pipeline. Native fields shadow Lit accessors.
    config.esbuild = {
      ...(typeof config.esbuild === 'object' ? config.esbuild : {}),
      tsconfigRaw: { compilerOptions: { useDefineForClassFields: false } },
    };
    return config;
  },
};

export default config;
