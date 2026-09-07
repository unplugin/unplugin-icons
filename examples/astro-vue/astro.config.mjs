import Vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import { FileSystemHMRIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [
    Vue(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
        customCollections: {
          ...FileSystemHMRIconLoader('custom-a', 'custom'),
        },
      }),
    ],
  },
})
