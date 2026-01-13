import type { ResolvedOptions } from '../../types'
import type { Compiler, CustomCompiler } from './types'
import { AstroCompiler } from './astro'
import { EmberCompiler } from './ember'
import { JSXCompiler } from './jsx'
import { MarkoCompiler } from './marko'
import { NoneCompiler } from './none'
import { QwikCompiler } from './qwik'
import { RawCompiler } from './raw'
import { SolidCompiler } from './solid'
import { SvelteCompiler } from './svelte'
import { Vue3Compiler } from './vue3'
import { WebComponentsCompiler } from './web-components'

export const compilers: Record<Exclude<ResolvedOptions['compiler'], CustomCompiler>, Compiler> = {
  'astro': AstroCompiler,
  'ember': EmberCompiler,
  'jsx': JSXCompiler,
  'marko': MarkoCompiler,
  'none': NoneCompiler,
  'raw': RawCompiler,
  'solid': SolidCompiler,
  'svelte': SvelteCompiler,
  'vue3': Vue3Compiler,
  'web-components': WebComponentsCompiler,
  'qwik': QwikCompiler,
}
