import { UserConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'

const config: UserConfig = {
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    svelte(),
    Icons({
      compiler: 'svelte'
    }),
  ],
}

export default config
