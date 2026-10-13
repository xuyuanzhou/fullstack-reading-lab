import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), vue()],
  server: {
    proxy: {
      '/orders': 'http://127.0.0.1:8080',
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
