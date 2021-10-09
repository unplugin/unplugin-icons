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
        if (id.endsWith('.css'))
          return id

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
        let code: string | null = null
        const css = id.endsWith('.css')
        if (css) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          code = await generateComponentFromPath(id, {
            ...config,
            compiler: 'css',
            scale: options.css?.scale ?? 1.2,
            defaultStyle: options.css?.defaultStyles || '',
            defaultClass: '',
          }) || null
        }
        else {
          code = await generateComponentFromPath(id, config) || null
        }

        if (code) {
          return {
            code,
            map: { version: 3, mappings: '', sources: [] } as any,
          }
        }
      }

      return null
    },
  }
})

export * from './types'

export default unplugin
