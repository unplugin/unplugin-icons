import type { Options } from './types'
import { createUnplugin } from 'unplugin'
import { generateComponentFromPath, isIconPath, normalizeIconPath, resolveIconsPath } from './core/loader'
import { resolveOptions } from './core/options'

const unplugin = createUnplugin<Options | undefined>((options = {}) => {
  const resolved = resolveOptions(options)

  return {
    name: 'unplugin-icons',
    enforce: 'pre',
    resolveId(id) {
      if (isIconPath(id)) {
        const normalizedId = normalizeIconPath(id)
        // fix issue 322
        const queryIndex = normalizedId.indexOf('?')
        const res = `${(queryIndex > -1 ? normalizedId.slice(0, queryIndex) : normalizedId)
          .replace(/\.\w+$/, '')
          .replace(/^\//, '')}${queryIndex > -1 ? `?${normalizedId.slice(queryIndex + 1)}` : ''}`
        const resolved = resolveIconsPath(res)
        // accept raw compiler from query params
        const compiler = resolved?.query?.raw === 'true' ? 'raw' : options.compiler
        if (compiler && typeof compiler !== 'string') {
          const ext = compiler.extension
          if (ext)
            return `${res}.${ext.startsWith('.') ? ext.slice(1) : ext}`
        }
        else {
          switch (compiler) {
            case 'astro':
              return `${res}.astro`
            case 'jsx':
              return `${res}.jsx`
            case 'qwik':
              return `${res}.jsx`
            case 'marko':
              return `${res}.marko`
            case 'svelte':
              return `${res}.svelte`
            case 'solid':
              return `${res}.tsx`
          }
        }
        return res
      }
      return null
    },
    loadInclude(id) {
      return isIconPath(id)
    },
    async load(id) {
      const {
        config,
        resolveVirtualIconPath,
      } = await resolved.then(({
        config,
        resolveVirtualIconPath,
      }) => ({
        config,
        resolveVirtualIconPath,
      }))
      const result = await generateComponentFromPath(id, config)
      if (result) {
        const path = resolveVirtualIconPath(
          result.resolved.collection,
          result.resolved.icon,
        )
        if (path) {
          this.addWatchFile(path)
        }
        return {
          code: result.code,
          map: { version: 3, mappings: '', sources: [] } as any,
        }
      }
    },
    rollup: {
      api: {
        config: options,
      },
    },
    vite: {
      async handleHotUpdate(ctx) {
        const mGraph = ctx.server.moduleGraph
        const modules = await resolved.then(({
          invalidateHMR,
        }) => invalidateHMR(
          ctx.file,
          id => mGraph.getModuleById(id),
        ))
        return modules?.length ? modules : undefined
      },
    },
  }
})

export * from './types'

export default unplugin
