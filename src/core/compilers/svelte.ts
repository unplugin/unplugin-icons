import { escapeSvelte } from '../utils'
import { Compiler } from './types'

export const SvelteCompiler = <Compiler>((svg: string) => {
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  const openTag = `${svg.slice(0, openTagEnd)} {...$$props}>`
  const content = `{@html \`${escapeSvelte(svg.slice(openTagEnd, closeTagStart))}\`}`
  const closeTag = svg.slice(closeTagStart)
  return `${openTag}${content}${closeTag}`
})
