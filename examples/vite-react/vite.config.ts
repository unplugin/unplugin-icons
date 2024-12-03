import React from '@vitejs/plugin-react-refresh'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    React(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
    Inspect(),
  ],
})
