import type { Compiler } from './types'

const RE_CURLY_BRACES = /([{}])/g
const RE_SVG_OPEN_TAG_END = /(?<=<svg[\s\S]*?)(>)/i

export const SolidCompiler = ((svg: string) => {
  const svgWithProps = svg.replace(RE_CURLY_BRACES, '{\'$1\'}').replace(RE_SVG_OPEN_TAG_END, '{...props}>')
  return `export default (props = {}) => ${svgWithProps}`
}) as Compiler
