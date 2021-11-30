import { loadConfig, loadVitePluginConfig } from 'unconfig'

loadConfig({
  sources: [
    loadVitePluginConfig({
      pluginNames: ['unplugin-icons'],
    }),
  ],
})
  .then(i => console.log(i))
