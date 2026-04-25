import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 需要子路径 /hushmic/；Vercel 根目录部署必须用 '/'
// 注意：Vercel 与 GitHub Actions 都会设 CI=true，不能只用 CI 判断
const base =
  process.env.VERCEL === '1' || process.env.VERCEL === 'true'
    ? '/'
    : process.env.CI
      ? '/hushmic/'
      : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
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
