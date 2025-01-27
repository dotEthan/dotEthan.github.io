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
      '@scss': '/scss', // Custom alias for easier path handling
    },
  },
});