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
          // React core — always needed
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-vendor';
          }
          // Monaco Editor
          if (id.includes('@monaco-editor') || id.includes('monaco-editor')) return 'monaco-editor';
          // TinyMCE
          if (id.includes('tinymce') || id.includes('@tinymce'))              return 'tinymce';
          // CKEditor
          if (id.includes('@ckeditor'))                                        return 'ckeditor';
          // MUI Icons
          if (id.includes('@mui/icons-material'))                              return 'mui-icons';
          // MUI core + x packages
          if (id.includes('@mui/'))                                            return 'mui';
          // Emotion
          if (id.includes('@emotion'))                                         return 'emotion';
          // Firebase
          if (id.includes('firebase'))                                         return 'firebase';
          // amcharts
          if (id.includes('@amcharts'))                                        return 'amcharts';
          // Syntax highlighting
          if (id.includes('prismjs') || id.includes('react-syntax-highlighter')) return 'code-highlight';
          // Forms
          if (id.includes('formik') || id.includes('yup') || id.includes('react-hook-form')) return 'forms';
          // Markdown
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('html-react-parser')) return 'markdown';
          // Particles
          if (id.includes('tsparticles') || id.includes('react-tsparticles')) return 'particles';
          // Everything else from node_modules
          if (id.includes('node_modules'))                                     return 'vendor';
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['@monaco-editor/react'],
  },
})
