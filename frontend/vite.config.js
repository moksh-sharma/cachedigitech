import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { spaAllowlist404Plugin } from './spaAllowlist404Plugin.js'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    spaAllowlist404Plugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-router')) return 'vendor-router'
          if (id.includes('node_modules/lenis')) return 'vendor-lenis'
          if (id.includes('node_modules/@use-gesture')) return 'vendor-gesture'
          if (id.includes('node_modules/lucide-react')) return 'vendor-lucide'
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: true,
    port: 5178,
    strictPort: false,
    watch: {
      ignored: ['**/dist/**', '**/dist.zip', '**/*.zip'],
    },
    // Proxy API to backend (chat)
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
