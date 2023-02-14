import type { ToJsComponentOptions } from '@svgx/core'
import { importModule } from 'local-pkg'
import { camelize } from '@iconify/utils/lib/misc/strings'
import type { Compiler } from './types'

export const QwikCompiler = <Compiler>(async (
  svg,
  collection,
  icon,
  options,
) => {
  const defaultOptions = {
    importSource: '@builder.io/qwik',
    runtime: 'automatic',
    componentName: camelize(`${collection}-${icon}`),
  } as ToJsComponentOptions
  const mergedOptions = Object.assign({}, defaultOptions, options)
  const svgx = await importModule('@svgx/core')
  // check for v6 transform, v5 default and previous versions
  const toJsComponent = svgx.toJsComponent || svgx.default || svgx
  const res = toJsComponent(svg, {
    ...mergedOptions,
    defaultExport: true,
  })
  return res
})
