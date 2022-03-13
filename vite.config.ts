import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: process.env['BACKEND_URL'],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    hmr: {
      port: 443,
    }
  },
})
