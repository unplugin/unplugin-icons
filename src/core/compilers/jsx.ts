// @ts-expect-error
import svgr from '@svgr/core'
import { Options } from '../../types'

export async function JSXCompiler(svg: string, collection: string, icon: string, style: Options['jsx'] = 'react') {
  let res = await svgr(svg, { icon: true }, { componentName: camel(`${collection}-${icon}`) })
  // svgr does not provide an option to support preact (WHY?),
  // we manually remove the react import for preact
  if (style === 'preact')
    res = res.replace('import * as React from "react";', '')
  return res
}

function camel(str: string) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}
