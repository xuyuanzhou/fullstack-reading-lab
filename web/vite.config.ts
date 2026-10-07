import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  // Relative base works for GitHub Pages and the local Python reader.
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4180',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // antd + 主壳仍会超过默认阈值；AI 课/题库已改为路由懒加载，勿用手动 group 把共享依赖塞进 AI chunk。
    chunkSizeWarningLimit: 3200,
  },
})
