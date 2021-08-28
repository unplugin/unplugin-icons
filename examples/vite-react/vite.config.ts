import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-refresh'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    React(),
    Inspect(),
    Icons({
      compiler: 'jsx',
    }),
  ],
})
