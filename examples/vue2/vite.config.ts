import { UserConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
import Components from 'vite-plugin-components'

const config: UserConfig = {
  plugins: [
    createVuePlugin(),
    Components({
      customComponentResolvers: [
        ViteIconsResolver(),
      ],
    }),
    Icons(),
  ],
}

export default config
