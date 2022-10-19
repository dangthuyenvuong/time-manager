import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import tsconfigPaths from 'vite-tsconfig-paths'

const path = require('path')

const env = loadEnv(
  'mock',
  process.cwd(),
  ''
)
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
  publicDir: './public',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "core": path.resolve(__dirname, "./src/core"),
      "ui": path.resolve(__dirname, "./src/ui"),
      "assets": path.resolve(__dirname, "./src/assets"),
      "utils": path.resolve(__dirname, "./src/utils"),
      "lib": path.resolve(__dirname, "./src/lib"),
      "stores": path.resolve(__dirname, "./src/stores"),
      "services": path.resolve(__dirname, "./src/services"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "config": path.resolve(__dirname, "./src/config"),
      "atoms": path.resolve(__dirname, "./src/components/atoms"),
      "molecules": path.resolve(__dirname, "./src/components/molecules"),
      "organisms": path.resolve(__dirname, "./src/components/organisms"),
      "templates": path.resolve(__dirname, "./src/components/templates"),
      "layouts": path.resolve(__dirname, "./src/components/layouts"),
      "routers": path.resolve(__dirname, "./src/routers"),
    },
  },
  server: {
    // open: true,
    port: parseInt(env.PORT) || undefined,
  },
  build: {
    outDir: './build',
    rollupOptions: {
      external: [
        /^node:.*/
      ]
    }
  },
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
