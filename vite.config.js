import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
  resolve: {
    alias: {
      '@scss': '/scss',
    },
  },
});