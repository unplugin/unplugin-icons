import type { Compiler } from './types'

export const RawCompiler = <Compiler>((svg: string) => {
  return `export default ${JSON.stringify(svg)}`
})
