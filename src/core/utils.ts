import { Options } from '../types'

export function getVueVersion() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vue = require('vue')
    const version = vue?.default?.version || vue?.version || '3'
    return version.startsWith('2.') ? 'vue2' : 'vue3'
  }
  catch {
    return 'vue3'
  }
}

export function guessCompiler(): Options['compiler'] {
  return 'vue3'
}
