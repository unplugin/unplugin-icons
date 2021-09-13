import { UserConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

const config: UserConfig = {
  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons({
      defaultClass: 'text-red-100',
      defaultStyle: 'color: green',
      compiler: 'vue2',
    }),
  ],
}

export default config
