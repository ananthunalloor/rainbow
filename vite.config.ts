import { defineConfig } from 'vite';

export default defineConfig({
  // Keep Lit's reactive accessors compatible with class-field initialization.
  esbuild: { tsconfigRaw: { compilerOptions: { useDefineForClassFields: false } } },
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        theme: 'src/theme/index.ts',
        tokens: 'src/tokens/index.ts',
        components: 'src/components/index.ts',
        auto: 'src/auto.ts',
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ['lit'],
    },
  },
});
