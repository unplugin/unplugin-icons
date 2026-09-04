import { FileSystemHMRIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import ViteComponents from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    ['unplugin-icons/nuxt', {
      customCollections: {
        ...FileSystemHMRIconLoader('app/custom-a', 'custom'),
      },
    }],
  ],
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            prefix: '',
            strict: true,
            customCollections: ['custom-a'],
          }),
        ],
        dts: true,
      }),
    ],
  },
})
