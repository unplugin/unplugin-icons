import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './core/loader'
import { Options } from './types'

const unplugin = createUnplugin<Options>((options = {}) => {
  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-icons',
    enforce: 'pre',
    resolveId(id) {
      if (isIconPath(id)) {
        const res = normalizeIconPath(id)
          .replace(/\.\w+$/i, '')
          .replace(/^\//, '')
        const ext = options.compiler === 'jsx'
          ? '.jsx'
          : options.compiler === 'svelte'
            ? '.svelte'
            : ''
        return res + ext
      }
      return null
    },
    async load(id) {
      const config = await resolved
      if (isIconPath(id)) {
        const code = await generateComponentFromPath(id, config) || null
        if (code)
          return { code, map: { mappings: '' } as any }
      }

      return null
    },
  }
})

export * from './types'

export default unplugin
