import { sveltekit } from '@sveltejs/kit/vite'
import { FileSystemHMRIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
      customCollections: {
        ...FileSystemHMRIconLoader('custom-a', 'custom'),
      },
    }),
  ],
})
