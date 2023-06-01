import type { Compiler } from './types'

export const MarkoCompiler = ((svg: string) => {
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  const openTag = `${svg.slice(0, openTagEnd)} ...input>`
  const content = `$!{\`${escapeTemplateLiteral(svg.slice(openTagEnd + 1, closeTagStart))}\`}`
  const closeTag = svg.slice(closeTagStart)
  return `${openTag}${content}${closeTag}`
}) as Compiler

export function escapeTemplateLiteral(str: string): string {
  return str.replace(/\\.|[$`]/g, (m) => {
    switch (m) {
      case '$': return '&#36'
      case '`': return '&#96;'
      default: return m
    }
  })
}
