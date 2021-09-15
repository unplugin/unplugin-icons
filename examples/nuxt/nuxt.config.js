export default {
  buildModules: [
    ['@nuxt/typescript-build', { typeCheck: false }],
    '@nuxtjs/composition-api/module',
    'unplugin-icons/nuxt',
  ],
  components: true,
}
