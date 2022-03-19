import { importModule } from 'local-pkg'
import { camelize } from '@iconify/utils/lib/misc/strings'
import type { Compiler } from './types'

export const JSXCompiler = <Compiler>(async(
  svg,
  collection,
  icon,
  options,
) => {
  const svgrCore = await importModule('@svgr/core')
  // check for v6 transform, v5 default and previous versions
  const svgr = svgrCore.transform || svgrCore.default || svgrCore
  let res = await svgr(
    svg,
    {},
    { componentName: camelize(`${collection}-${icon}`) },
  )
  // svgr does not provide an option to support preact (WHY?),
  // we manually remove the react import for preact
  if (options.jsx !== 'react')
    res = res.replace('import * as React from "react";', '')
  return res
})
