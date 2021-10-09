import { ResolvedOptions } from '../../types'
import { Compiler } from './types'

export const CssCompiler = <Compiler>((
  svg: string,
  collection: string,
  icon: string,
  options: ResolvedOptions,
) => {
  let inlineSvg = svg.replace(/"/g, '\'')

  // we need to add the svg xml namespace
  if (!inlineSvg.includes('http://www.w3.org/2000/svg'))
    inlineSvg = inlineSvg.replace('<svg ', '<svg xmlns=\'http://www.w3.org/2000/svg\' ')

  const scale = options?.css.scale ?? 1.2

  return `.${collection}-${icon} {
background-image: url("data:image/svg+xml;base64,${Buffer.from(inlineSvg, 'utf-8').toString('base64')}");
background-size: ${scale}em ${scale}em;
height: ${scale}em;
width: ${scale}em;
display: inline-block;
${options.css.defaultStyles || ''}
}
`
})
