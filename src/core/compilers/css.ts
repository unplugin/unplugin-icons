import { ResolvedOptions } from '../../types'
import { Compiler } from './types'

export const CssCompiler = <Compiler>((
  svg: string,
  collection: string,
  icon: string,
  options: ResolvedOptions,
) => {
  // we need to add the svg xml namespace
  let inlineSvg = svg.includes('http://www.w3.org/2000/svg')
    ? svg.replace(/"/g, '\'')
    : svg.replace(/"/g, '\'').replace('<svg ', '<svg xmlns=\'http://www.w3.org/2000/svg\' ')

  // we can use svg or base64 encoding
  inlineSvg = options.css.type === 'base64'
    ? `base64,${Buffer.from(inlineSvg, 'utf-8').toString('base64')}`
    : `utf8,${inlineSvg}`

  const scale = options?.css.scale ?? 1.2

  return `.${collection}-${icon} {
background-image: url("data:image/svg+xml;${inlineSvg}");
height: ${scale}em;
width: ${scale}em;
background-size: ${scale}em ${scale}em;
display: inline-block;
${options.css.defaultStyle || ''}
}
`
})
