import { createUnplugin } from 'unplugin'
import { resolveOptions } from './core/options'
import { generateComponentFromPath, isIconPath, normalizeIconPath } from './core/loader'
import { Options } from './types'

const unplugin = createUnplugin<Options>((options = {}) => {
  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-icons',
    resolveId(id) {
      if (isIconPath(id)) {
        const res = normalizeIconPath(id)
          .replace(/\.\w+$/i, '')
          .replace(/^\//, '')
        const ext = '.jsx'
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
