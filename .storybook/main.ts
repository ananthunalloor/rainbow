import { defineMain } from '@storybook/web-components-vite/node';

export default defineMain({
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
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
    const existingEsbuild = typeof config.esbuild === 'object' ? config.esbuild : {};
    const existingTsconfigRaw =
      typeof existingEsbuild.tsconfigRaw === 'object' ? existingEsbuild.tsconfigRaw : {};
    const existingCompilerOptions =
      typeof existingTsconfigRaw.compilerOptions === 'object'
        ? existingTsconfigRaw.compilerOptions
        : {};

    config.esbuild = {
      ...existingEsbuild,
      tsconfigRaw: {
        ...existingTsconfigRaw,
        compilerOptions: { ...existingCompilerOptions, useDefineForClassFields: false },
      },
    };
    return config;
  },
});
