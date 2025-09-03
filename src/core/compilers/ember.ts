import type { Compiler } from './types'

export const EmberCompiler = ((svg: string) => {
  const svgWithProps = svg.replace('<svg', '<svg ...attributes')
  return `import { template } from "@ember/template-compiler";

const Icon = template(${JSON.stringify(svgWithProps)})
export default Icon;`
}) as Compiler
