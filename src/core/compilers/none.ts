import type { Compiler } from './types'

export const NoneCompiler = ((svg: string) => {
  return svg
}) as Compiler
