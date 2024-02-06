import type { Compiler } from './types'

export const SvelteCompiler = ((svg: string) => compileSvelte(svg)) as Compiler

export function compileSvelte(svg: string, runes = false) {
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  const openTag = `${svg.slice(0, openTagEnd)} {...${runes ? 'p' : '$$props'}}>`
  const content = `{@html \`${escapeSvelte(svg.slice(openTagEnd + 1, closeTagStart))}\`}`
  const closeTag = svg.slice(closeTagStart)
  const sfc = `${openTag}${content}${closeTag}`
  return runes ? `<script>const {...p}=$props()</script>${sfc}` : sfc
}

// escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
export function escapeSvelte(str: string): string {
  return str
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
    .replace(/`/g, '&#96;')
    .replace(/\\([trn])/g, ' ')
}
