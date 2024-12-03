import type { Options, ResolvedOptions } from '../types'
import process from 'node:process'
import createDebugger from 'debug'
import { getPackageInfo, isPackageExists } from 'local-pkg'

const debug = createDebugger('unplugin-icons:options')

export async function resolveOptions(options: Options): Promise<ResolvedOptions> {
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

  return {
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
    return result.version?.startsWith('2.') ? 'vue2' : 'vue3'
  }
  catch {
    return null
  }
}
