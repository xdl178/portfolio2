import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// base 路径（GitHub Pages 子路径部署的关键配置）
//
// 站点发布在 https://xdl178.github.io/portfolio2/ —— 属于【子路径】，
// 所以必须把 base 设成 '/portfolio2/'，否则打包后的 JS/CSS/favicon
// 会被解析到站点根目录（/assets/...）而全部 404。
//
// 本地开发用 '/'，这样 http://localhost:5174/ 直接可用。
// 换仓库名或绑自定义域名时，构建时覆盖即可：
//   PowerShell:  $env:VITE_BASE='/'; npm run build
// ---------------------------------------------------------------------------
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const base = isBuild ? (process.env.VITE_BASE ?? '/portfolio2/') : '/'

  return {
    base,
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5174,
    },
    build: {
      target: 'es2019',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-router-dom') || id.includes('react/') || id.includes('react-dom')) {
                return 'react-vendor'
              }
              if (id.includes('framer-motion')) {
                return 'motion-vendor'
              }
            }
          },
        },
      },
    },
  }
})
