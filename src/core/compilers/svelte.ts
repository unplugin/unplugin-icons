import type { Compiler } from './types'

let svelteRunes: boolean | null

export const SvelteCompiler = (async (svg: string) => {
  if (svelteRunes == null) {
    try {
      const { VERSION } = await import('svelte/compiler')
      svelteRunes = Number(VERSION.split('.')[0]) >= 5
    }
    catch {
      svelteRunes = false
    }
  }
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  let sfc = `${svg.slice(0, openTagEnd)} {...${svelteRunes ? 'p' : '$$props'}}>`
  if (svelteRunes)
    sfc += svg.slice(openTagEnd + 1, closeTagStart)
  else
    sfc += `{@html \`${escapeSvelte(svg.slice(openTagEnd + 1, closeTagStart))}\`}`

  sfc += svg.slice(closeTagStart)
  return svelteRunes ? `<script>const{...p}=$props()</script>${sfc}` : sfc
}) as Compiler

// escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
export function escapeSvelte(str: string): string {
  return str
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/`/g, '&#96;')
    .replace(/\\([trn])/g, ' ')
}
