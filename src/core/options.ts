import hasPkg from 'has-pkg'
import { Options, ResolvedOptions } from '../types'

export async function resolveOptions(options: Options): Promise<ResolvedOptions> {
  const {
    scale = 1.2,
    defaultStyle = '',
    defaultClass = '',
    compiler = await guessCompiler(),
    jsx = guessJSX(),
    customCollections = {},
  } = options

  const webComponents = Object.assign({
    autoDefine: false,
    iconPrefix: 'icon',
  }, options.webComponents)

  return {
    scale,
    defaultStyle,
    defaultClass,
    customCollections,
    compiler,
    jsx,
    webComponents,
  }
}

async function guessCompiler(): Promise<ResolvedOptions['compiler']> {
  return await getVueVersion() || (hasPkg('@svgr/core') ? 'jsx' : 'vue3')
}

function guessJSX(): ResolvedOptions['jsx'] {
  if (hasPkg('preact'))
    return 'preact'
  return 'react'
}

async function getVueVersion() {
  try {
    const vue = await import('vue')
    // @ts-ignore
    const version = vue?.default?.version || vue?.version || '3'
    return version.startsWith('2.') ? 'vue2' : 'vue3'
  }
  catch {
    return null
  }
}
