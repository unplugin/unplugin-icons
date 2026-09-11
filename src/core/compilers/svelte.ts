import type { Compiler } from './types'

let svelteRunes: boolean | null

const RE_OPEN_CURLY = /\{/g
const RE_CLOSE_CURLY = /\}/g
const RE_BACKTICK = /`/g
const RE_ESCAPED_WHITESPACE = /\\([trn])/g

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
    .replace(RE_OPEN_CURLY, '&#123;')
    .replace(RE_CLOSE_CURLY, '&#125;')
    .replace(RE_BACKTICK, '&#96;')
    .replace(RE_ESCAPED_WHITESPACE, ' ')
}
