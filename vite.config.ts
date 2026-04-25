import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 仅 localhost 时，用手机 / 同网其它电脑访问会「拒绝连接」；监听 0.0.0.0 可局域网打开
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // 开发时自动用默认浏览器打开（避免手输地址打错）
    open: true,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
