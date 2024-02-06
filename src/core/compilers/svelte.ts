import type { Compiler } from './types'

let svelteRunes: boolean | null

export const SvelteCompiler = (async (svg: string) => {
  if (svelteRunes == null) {
    try {
      // @ts-expect-error we don't have svelte as dependency
      const { VERSION } = await import('svelte/compiler')
      svelteRunes = Number(VERSION.split('.')[0]) >= 5
    }
    catch {
      svelteRunes = false
    }
  }
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  const openTag = `${svg.slice(0, openTagEnd)} {...${svelteRunes ? 'p' : '$$props'}}>`
  const content = `{@html \`${escapeSvelte(svg.slice(openTagEnd + 1, closeTagStart))}\`}`
  const closeTag = svg.slice(closeTagStart)
  const sfc = `${openTag}${content}${closeTag}`
  return svelteRunes ? `<script>const{...p}=$props()</script>${sfc}` : sfc
}) as Compiler

// escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
export function escapeSvelte(str: string): string {
  return str
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
    .replace(/`/g, '&#96;')
    .replace(/\\([trn])/g, ' ')
}
