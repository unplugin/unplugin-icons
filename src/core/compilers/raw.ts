import type { Compiler } from './types'

export const RawCompiler = ((svg: string) => {
  return `export default ${JSON.stringify(svg)}`
}) as Compiler
