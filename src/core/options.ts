import type { CustomHMRIconLoader, Options, ResolvedOptions } from '../types'
import process from 'node:process'
import { getPackageInfo, isPackageExists } from 'local-pkg'
import { createDebug } from 'obug'
import { isCustomHMRIconLoader } from './hmr'

const debug = createDebug('unplugin-icons:options')

export async function resolveOptions(options: Options): Promise<{
  resolved: ResolvedOptions
  invalidateHMR: <T>(
    id: string,
    map: (id: string) => T | undefined,
  ) => Promise<T[] | undefined>
  resolveVirtualIconPath: (collectionName: string, iconName: string) => string | undefined
}> {
  const {
    scale = 1.2,
    defaultStyle = '',
    defaultClass = '',
    compiler = await guessCompiler(),
    jsx = guessJSX(),
    customCollections = {},
    iconCustomizer = () => {},
    transform,
    autoInstall = false,
    collectionsNodeResolvePath = process.cwd(),
  } = options

  const webComponents = Object.assign({
    autoDefine: false,
    iconPrefix: 'icon',
  }, options.webComponents)

  debug('compiler', compiler)

  const useCustomCollections: typeof customCollections = {}
  const hmrCustomIconResolvers: CustomHMRIconLoader[] = []
  for (const [key, collection] of Object.entries(customCollections)) {
    if (isCustomHMRIconLoader(collection)) {
      hmrCustomIconResolvers.push(collection)
      useCustomCollections[key as keyof typeof customCollections] = async (name) => {
        return await collection.iconLoader(name)
      }
    }
    else {
      useCustomCollections[key as keyof typeof customCollections] = collection
    }
  }

  async function invalidateHMR<T>(
    id: string,
    findModule: (id: string) => T | undefined,
  ): Promise<T[] | undefined> {
    return await import('./hmr').then(({
      collectVirtualIconModuleNames,
    }) => collectVirtualIconModuleNames(
      id,
      hmrCustomIconResolvers,
      findModule,
    ))
  }

  function resolveVirtualIconPath(collectionName: string, iconName: string): string | undefined {
    return hmrCustomIconResolvers
      .find(r => r.name === collectionName)
      ?.resolveVirtualIconPath(iconName)
  }

  return {
    invalidateHMR,
    resolveVirtualIconPath,
    resolved: {
      scale,
      defaultStyle,
      defaultClass,
      customCollections: useCustomCollections,
      iconCustomizer,
      compiler,
      jsx,
      webComponents,
      transform,
      autoInstall,
      collectionsNodeResolvePath,
    },
  }
}

async function guessCompiler(): Promise<ResolvedOptions['compiler']> {
  return await getVueVersion() || (isPackageExists('@svgr/core') ? 'jsx' : 'vue3')
}

function guessJSX(): ResolvedOptions['jsx'] {
  if (isPackageExists('preact'))
    return 'preact'
  return 'react'
}

async function getVueVersion() {
  try {
    const result = await getPackageInfo('vue')
    if (!result || !result.version)
      return null
    // Only support Vue 3, Vue 2 is no longer supported
    return result.version?.startsWith('3.') ? 'vue3' : null
  }
  catch {
    return null
  }
}
