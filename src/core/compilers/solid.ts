import { Compiler } from './types'

export const SolidCompiler = <Compiler>((svg: string) => {
  const svgWithProps = svg.replace(/([{}])/i, "{'$1'}").replace(/(?<=<svg.*?)(>)/i, '{...props}>')
  return `export default (props = {}) => ${svgWithProps}`
})
