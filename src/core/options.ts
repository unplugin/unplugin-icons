import hasPkg from 'has-pkg'
import { Options, ResolvedOptions } from '../types'

export function resolveOptions(options: Options): ResolvedOptions {
  const {
    scale = 1.2,
    defaultStyle = '',
    defaultClass = '',
    compiler = guessCompiler(),
    jsx = guessJSX(),
  } = options

  return {
    scale,
    defaultStyle,
    defaultClass,
    compiler,
    jsx,
  }
}

function guessCompiler(): ResolvedOptions['compiler'] {
  return getVueVersion() || (hasPkg('@svgr/core') ? 'jsx' : 'vue3')
}

function guessJSX(): ResolvedOptions['jsx'] {
  if (hasPkg('preact'))
    return 'preact'
  return 'react'
}

function getVueVersion() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vue = require('vue')
    const version = vue?.default?.version || vue?.version || '3'
    return version.startsWith('2.') ? 'vue2' : 'vue3'
  }
  catch {
    return null
  }
}
