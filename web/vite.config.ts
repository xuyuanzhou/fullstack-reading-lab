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
    // 主壳含 antd + 瘦 index；bodies 按轨 / AI 已懒加载。勿用手动 group 把共享依赖塞进 AI chunk。
    chunkSizeWarningLimit: 1200,
  },
})
