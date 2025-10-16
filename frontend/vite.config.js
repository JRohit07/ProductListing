import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/products': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/api/segments': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  }
})