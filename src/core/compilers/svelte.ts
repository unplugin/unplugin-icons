import type { Compiler } from './types'

export const SvelteCompiler = (async (svg: string) => {
  // @ts-expect-error we don't have svelte as dependency
  const runes = await import('svelte/compiler').then((pkg) => {
    const major = 'VERSION' in pkg ? Number.parseInt(pkg.VERSION.split('.')[0]) : undefined
    return major && !Number.isNaN(major) && major >= 5
  }).catch(() => false)
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  const openTag = `${svg.slice(0, openTagEnd)} {...${runes ? 'p' : '$$props'}}>`
  const content = `{@html \`${escapeSvelte(svg.slice(openTagEnd + 1, closeTagStart))}\`}`
  const closeTag = svg.slice(closeTagStart)
  const sfc = `${openTag}${content}${closeTag}`
  return runes ? `<script>const{...p}=$props()</script>${sfc}` : sfc
}) as Compiler

// escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
export function escapeSvelte(str: string): string {
  return str
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
    .replace(/`/g, '&#96;')
    .replace(/\\([trn])/g, ' ')
}
