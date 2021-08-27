/* eslint-disable @typescript-eslint/no-var-requires */

const ScriptSetup = require('unplugin-vue2-script-setup/webpack')
const Icons = require('unplugin-icons/webpack').default

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  configureWebpack: {
    plugins: [
      ScriptSetup({
        refTransform: true,
      }),
      Icons(),
    ],
  },
  chainWebpack(config) {
    // disable type check and let `vue-tsc` handles it
    config.plugins.delete('fork-ts-checker')

    // disable cache for testing, you should remove this in production
    config.module.rule('vue').uses.delete('cache-loader')
    config.module.rule('js').uses.delete('cache-loader')
    config.module.rule('ts').uses.delete('cache-loader')
    config.module.rule('tsx').uses.delete('cache-loader')
  },
}
