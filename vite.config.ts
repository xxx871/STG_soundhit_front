/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
    coverage: {
      provider: "v8",
      include: [
        "app/**/*.{ts,tsx}",
        "features/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "!app/api/**/*.{ts,tsx}",
        "!app/layout.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'features': path.resolve(__dirname, 'features'),
    },
  },
});