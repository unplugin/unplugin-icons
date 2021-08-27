export default {
  buildModules: [
    ['@nuxt/typescript-build', { typeCheck: false }],
    '@nuxtjs/composition-api/module',
    'unplugin-vue2-script-setup/nuxt',
    'unplugin-icons/nuxt',
  ],
}
