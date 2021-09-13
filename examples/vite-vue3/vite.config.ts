import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

const config: UserConfig = {
  plugins: [
    Vue(),
    Components({
      dts: true,
      resolders: [
        IconsResolver(),
      ],
    }),
    Icons({
      compiler: 'vue3',
    }),
  ],
}

export default config
