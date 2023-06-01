import type { Compiler } from './types'

export const AstroCompiler = ((svg: string) => {
  const svgWithProps = svg.replace('<svg', '<svg {...props}')
  return `---
  interface Props extends astroHTML.JSX.SVGAttributes {};
  const props = Astro.props;
---
${svgWithProps}`
}) as Compiler
