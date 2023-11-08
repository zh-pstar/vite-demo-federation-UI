import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n'],
      resolvers: [NaiveUiResolver()],
      dts:'src/auto-import.d.ts'
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    federation({
      name: 'host-app',
      // 定义远程模块入口
      remotes: {
        'remote-app': 'http://192.168.1.25:4173/assets/remoteEntry.js',
      },
      // 共享依赖声明
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext',
  },
})
