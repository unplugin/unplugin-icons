// @ts-expect-error
import svgr from '@svgr/core'
import { Options } from '../../types'

export async function JSXCompiler(svg: string, collection: string, icon: string, style: Options['jsx'] = 'react') {
  return svgr(svg, { icon: true }, { componentName: camel(`${collection}-${icon}`) })
}

function camel(str: string) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}
