import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts'],
    exclude: [
      'node_modules',
      '.next',
      'out',
      'dist',
      '.git',
      '**/e2e/**',
      '**/cypress/**',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': './',
    },
  },
});
