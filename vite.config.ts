/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: './test/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false,
    },
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/components/ui', 'src/mocks'],
      reporter: ['text', 'json', 'html', 'lcov', 'cobertura'],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      test: path.resolve(__dirname, './test'),
    },
  },
  base: '/hub/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) {
            return 'assets/[ext]/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/chunks/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('prosemirror')) {
              return 'prosemirror';
            }
            if (id.includes('jspdf')) {
              return 'jspdf';
            }
            if (id.includes('tiptap')) {
              return 'tiptap';
            }
            if (id.includes('html2canvas')) {
              return 'html2canvas';
            }
            if (id.includes('jspdf')) {
              return 'jspdf';
            }
            if (id.includes('canvg')) {
              return 'canvg';
            }

            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
