import { defineConfig } from 'astro/config'
import { FileSystemHMRIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
        customCollections: {
          ...FileSystemHMRIconLoader('custom-a', 'custom'),
        },
      }),
    ],
  },
})
