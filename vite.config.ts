import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (alejmnz0.github.io) is served from the domain root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    // One shared "today" for prerendered HTML and the hydrated client (durations, "actualidad").
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    target: 'es2022',
    assetsInlineLimit: 2048,
  },
});
