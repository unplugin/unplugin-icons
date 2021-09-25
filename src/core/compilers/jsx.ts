import { camelize } from '../utils'
import { Compiler } from './types'

export const JSXCompiler = <Compiler>(async(svg, collection, icon, options) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const svgr = require('@svgr/core').default
  let res = await svgr(svg, {}, { componentName: camelize(`${collection}-${icon}`) })
  // svgr does not provide an option to support preact (WHY?),
  // we manually remove the react import for preact
  if (options.jsx !== 'react')
    res = res.replace('import * as React from "react";', '')
  return res
})
