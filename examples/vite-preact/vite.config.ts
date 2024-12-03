import Preact from '@preact/preset-vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

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
