import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to every interface so container/preview proxies can reach the app.
    host: true,
    port: 5173,
    // Dynamic preview hosts (e.g. *.e2b.app) must be accepted.
    allowedHosts: true,
    proxy: {
      // The browser only ever talks to this dev server; API calls are proxied
      // to Django so localhost is never referenced from client code.
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/media': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    allowedHosts: true,
    port: 4173,
  },
})
