import type {
  CustomHMRIconLoader,
  CustomCollectionIconLoader as IconifyCustomCollectionIconLoader,
} from '@iconify/utils/lib/loader/types'
import type { Options, ResolvedOptions } from '../types'
import process from 'node:process'
import { isCustomHMRIconLoader } from '@iconify/utils/lib/loader/hmr-utils'
import { getPackageInfo, isPackageExists } from 'local-pkg'
import { createDebug } from 'obug'

const debug = createDebug('unplugin-icons:options')

export async function resolveOptions(options: Options): Promise<{
  config: ResolvedOptions
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

  const customHMRIconLoadersMap = new Map<string, CustomHMRIconLoader>()
  for (const collection of Object.values(customCollections)) {
    if (typeof collection === 'object' && '__iconifyCustomHmrIconLoader' in collection) {
      const loader = collection as IconifyCustomCollectionIconLoader
      if (isCustomHMRIconLoader(loader)) {
        customHMRIconLoadersMap.set(loader.name, loader)
      }
    }
  }
  const customHMRIconLoaders = Array.from(customHMRIconLoadersMap.values())

  async function invalidateHMR<T>(
    id: string,
    findModule: (id: string) => T | undefined,
  ): Promise<T[] | undefined> {
    return await import('./hmr').then(({
      collectVirtualIconModuleNames,
    }) => collectVirtualIconModuleNames(
      id,
      customHMRIconLoaders,
      findModule,
    ))
  }

  function resolveVirtualIconPath(collectionName: string, iconName: string): string | undefined {
    return customHMRIconLoadersMap.get(collectionName)?.resolveSVGIconPath(iconName)
  }

  debug('compiler', compiler)

  return {
    invalidateHMR,
    resolveVirtualIconPath,
    config: {
      scale,
      defaultStyle,
      defaultClass,
      customCollections,
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
