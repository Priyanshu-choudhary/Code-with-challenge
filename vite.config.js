import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ─── Vitest configuration ─────────────────────────────────────────────────
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },

  // ─── Build optimisation ───────────────────────────────────────────────────
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split packages that are truly standalone (no React imports at module level).
          // Do NOT manually chunk React, MUI, emotion, styled-components, or anything that
          // calls React.createContext at init — splitting those causes TDZ / undefined errors.
          if (id.includes('@monaco-editor') || id.includes('monaco-editor')) return 'monaco-editor';
          if (id.includes('tinymce') || id.includes('@tinymce'))              return 'tinymce';
          if (id.includes('@ckeditor'))                                        return 'ckeditor';
          if (id.includes('@amcharts'))                                        return 'amcharts';
          if (id.includes('firebase'))                                         return 'firebase';
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['@monaco-editor/react'],
  },
})
