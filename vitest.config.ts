import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { tsconfigRaw: { compilerOptions: { useDefineForClassFields: false } } },
  test: {
    environment: 'happy-dom',
    globals: false,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
