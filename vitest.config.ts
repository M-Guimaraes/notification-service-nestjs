import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts', './src/**/*.spec.ts'],
    globals: true,
    root: './',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
  plugins: [swc.vite(), tsconfigPaths()],
});
