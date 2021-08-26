import { UserConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'vite-plugin-components'

const config: UserConfig = {
  plugins: [
    createVuePlugin(),
    Components({
      customComponentResolvers: [
        IconsResolver(),
      ],
    }),
    Icons(),
  ],
}

export default config
