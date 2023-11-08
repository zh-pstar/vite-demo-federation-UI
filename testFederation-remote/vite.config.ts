import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      resolvers: [ElementPlusResolver()],
      dts:'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    federation({
      name: 'remote-app',
      // 模块入口文件
      filename: 'remoteEntry.js',
      // 导出模块声明
      exposes: {
        './EleTree': './src/components/EleTreePlus.vue',
      },
      // 共享依赖声明
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext',
  },
})
