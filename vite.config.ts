import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// vite按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 9002
    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/reverse_geocoding/v3': {
    //     target: ' http://api.map.baidu.com/reverse_geocoding/v3', // 实际请求地址
    //     changeOrigin: true
    //     // rewrite: (path) => path.replace('', '')
    //   }
    // }
  }
})
