// import { ResolvedOptions } from '../../types'
import { Compiler } from './types'

export const CssCompiler = <Compiler>((
  svg: string,
  collection: string,
  icon: string,
  // options: ResolvedOptions,
) => {
  return `.${collection}-${icon} {
background: url(data:image/svg+xml;base64,${Buffer.from(svg, 'utf-8').toString('base64')}) no-repeat center;
background-size: 16px 16px;
height: 16px;
opacity: 0.87;
width: 16px;
max-width: 16px;
display: inline-block;
}
`
})
