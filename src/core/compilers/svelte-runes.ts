import type { Compiler } from './types'
import { compileSvelte } from './svelte'

export const SvelteRunesCompiler = ((svg: string) => compileSvelte(svg, true)) as Compiler
