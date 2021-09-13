import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './core/loader'
import { Options } from './types'

const unplugin = createUnplugin<Options>((options = {}) => {
  const resolved = resolveOptions(options)

  const svelte = options.compiler === 'svelte'

  const enforce = svelte ? 'pre' : undefined

  return {
    name: 'unplugin-icons',
    enforce,
    resolveId(id) {
      if (isIconPath(id)) {
        const res = normalizeIconPath(id)
          .replace(/\.\w+$/i, '')
          .replace(/^\//, '')
        const ext = options.compiler === 'jsx' ? '.jsx' : (svelte ? '.svelte' : '')
        return res + ext
      }
      return null
    },
    async load(id) {
      if (isIconPath(id))
        return await generateComponentFromPath(id, resolved) || null

      return null
    },
  }
})

export * from './types'

export default unplugin
