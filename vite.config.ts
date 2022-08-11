import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import tsconfigPaths from 'vite-tsconfig-paths'

const path = require('path')
// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: (name) => `antd/es/${name}/style`
        },

      ]
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#00ADB5',
          'error-color': '#EB4747',
          // 'success-color': '#34B3F1',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
      }
    }
  },
  preview: {
    port: 3000
  }
})
export default config
