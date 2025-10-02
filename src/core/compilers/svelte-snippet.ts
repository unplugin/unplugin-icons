import type { Compiler } from './types'

export const SvelteSnippetCompiler = (async (svg: string) => {
  const openTagEnd = svg.indexOf('>', svg.indexOf('<svg '))
  const closeTagStart = svg.lastIndexOf('</svg')
  let sfc = `${svg.slice(0, openTagEnd)} {...p}>`

  sfc += svg.slice(openTagEnd + 1, closeTagStart)

  sfc += svg.slice(closeTagStart)

  return `<script module>export{snippet}</script><script>const p=$props()</script>{#snippet snippet(p)}${sfc}{/snippet}{@render snippet(p)}`
}) as Compiler
