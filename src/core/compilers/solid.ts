import type { Compiler } from './types'

export const SolidCompiler = ((svg: string) => {
  const svgWithProps = svg.replace(/([{}])/g, '{\'$1\'}').replace(/(?<=<svg[\s\S]*?)(>)/i, '{...props}>')
  return `export default (props = {}) => ${svgWithProps}`
}) as Compiler
