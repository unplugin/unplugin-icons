import { importModule } from 'local-pkg'
import { camelize } from '../utils'
import { Compiler } from './types'

export const JSXCompiler = <Compiler>(async(svg, collection, icon, options) => {
  // @svgr/core mixes default and named exports, which causes an akward extra `default` here
  const svgr = (await importModule('@svgr/core')).default.default;
  let res = await svgr(svg, {}, { componentName: camelize(`${collection}-${icon}`) })
  // svgr does not provide an option to support preact (WHY?),
  // we manually remove the react import for preact
  if (options.jsx !== 'react')
    res = res.replace('import * as React from "react";', '')
  return res
})
