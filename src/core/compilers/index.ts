import type { ResolvedOptions } from '../../types'
import { JSXCompiler } from './jsx'
import { MarkoCompiler } from './marko'
import { NoneCompiler } from './none'
import { RawCompiler } from './raw'
import { SolidCompiler } from './solid'
import { SvelteCompiler } from './svelte'
import type { Compiler } from './types'
import { Vue2Compiler } from './vue2'
import { Vue3Compiler } from './vue3'
import { WebComponentsCompiler } from './web-components'

export const compilers: Record<ResolvedOptions['compiler'], Compiler> = {
  'vue2': Vue2Compiler,
  'vue3': Vue3Compiler,
  'solid': SolidCompiler,
  'svelte': SvelteCompiler,
  'jsx': JSXCompiler,
  'marko': MarkoCompiler,
  'none': NoneCompiler,
  'raw': RawCompiler,
  'web-components': WebComponentsCompiler,
}
