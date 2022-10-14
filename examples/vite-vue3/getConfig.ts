import { loadConfig, loadVitePluginConfig } from 'unconfig'

loadConfig({
  sources: [
    loadVitePluginConfig({
      pluginNames: ['unplugin-icons'],
    }),
  ],
})
// eslint-disable-next-line no-console
  .then(i => console.log(i))
