import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-router': ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: true,
    port: 5178,
    strictPort: false,
    // Proxy API to backend (chat)
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
