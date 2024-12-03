import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Icons({
      compiler: 'jsx',
      jsx: 'preact',
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
