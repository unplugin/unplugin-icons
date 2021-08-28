import { defineConfig } from 'vite'
import Preact from '@preact/preset-vite'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Preact(),
    Inspect(),
    Icons({
      compiler: 'jsx',
      jsx: 'preact',
    }),
  ],
})
