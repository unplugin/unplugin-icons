import type { Compiler } from './types'
import { camelize } from '@iconify/utils/lib/misc/strings'
import { importModule } from 'local-pkg'

export const JSXCompiler = (async (
  svg,
  collection,
  icon,
  options,
) => {
  const svgrCore = await importModule('@svgr/core')
  // check for v6/v7 transform (v7 on CJS it is in default), v5 default and previous versions
  const svgr = svgrCore.transform // v6 or v7 ESM
    || (svgrCore.default ? (svgrCore.default.transform /* v7 CJS */ ?? svgrCore.default) : svgrCore.default)
    || svgrCore
  let res = await svgr(
    svg,
    {
      plugins: ['@svgr/plugin-jsx'],
      ref: options.jsx === 'react',
    },
    { componentName: camelize(`${collection}-${icon}`) },
  )
  // svgr does not provide an option to support preact (WHY?),
  // we manually remove the react import for preact
  if (options.jsx !== 'react')
    res = res.replace('import * as React from "react";', '')
  return res
}) as Compiler
