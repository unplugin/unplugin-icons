import type { ResolvedOptions } from '../../types'
import { AstroCompiler } from './astro'
import { JSXCompiler } from './jsx'
import { MarkoCompiler } from './marko'
import { NoneCompiler } from './none'
import { QwikCompiler } from './qwik'
import { RawCompiler } from './raw'
import { SolidCompiler } from './solid'
import { SvelteCompiler } from './svelte'
import type { Compiler, CustomCompiler } from './types'
import { Vue2Compiler } from './vue2'
import { Vue3Compiler } from './vue3'
import { WebComponentsCompiler } from './web-components'
import { SvelteRunesCompiler } from './svelte-runes'

export const compilers: Record<Exclude<ResolvedOptions['compiler'], CustomCompiler>, Compiler> = {
  'astro': AstroCompiler,
  'jsx': JSXCompiler,
  'marko': MarkoCompiler,
  'none': NoneCompiler,
  'raw': RawCompiler,
  'solid': SolidCompiler,
  'svelte': SvelteCompiler,
  'svelte-runes': SvelteRunesCompiler,
  'vue2': Vue2Compiler,
  'vue3': Vue3Compiler,
  'web-components': WebComponentsCompiler,
  'qwik': QwikCompiler,
}
