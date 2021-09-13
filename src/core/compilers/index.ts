import { ResolvedOptions } from '../../types'
import { JSXCompiler } from './jsx'
import { NoneCompiler } from './none'
import { RawCompiler } from './raw'
import { SolidCompiler } from './solid'
import { Compiler } from './types'
import { Vue2Compiler } from './vue2'
import { Vue3Compiler } from './vue3'
import { WebComponentsCompiler } from './web-components'

export const compilers: Record<ResolvedOptions['compiler'], Compiler> = {
  'vue2': Vue2Compiler,
  'vue3': Vue3Compiler,
  'solid': SolidCompiler,
  'svelte': NoneCompiler,
  'jsx': JSXCompiler,
  'none': NoneCompiler,
  'raw': RawCompiler,
  'web-components': WebComponentsCompiler,
}
