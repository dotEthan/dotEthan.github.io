import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
  build: {
    rollupOptions: {
      input: './index.html',  // Ensures correct input for the build process
    }
  }
});