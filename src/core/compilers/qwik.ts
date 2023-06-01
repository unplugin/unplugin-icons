import type { ToJsComponentOptions } from '@svgx/core'
import { importModule } from 'local-pkg'
import { camelize } from '@iconify/utils/lib/misc/strings'
import type { Compiler } from './types'

export const QwikCompiler = (async (
  svg,
  collection,
  icon,
  options,
) => {
  const defaultOptions: ToJsComponentOptions = {
    importSource: '@builder.io/qwik',
    runtime: 'automatic',
    componentName: camelize(`${collection}-${icon}`),
  }
  const mergedOptions = Object.assign({}, defaultOptions, options)
  const svgx = await importModule('@svgx/core')
  // check for v6 transform, v5 default and previous versions
  const toJsComponent = svgx.toJsComponent || svgx.default || svgx
  const res = toJsComponent(svg, {
    ...mergedOptions,
    defaultExport: true,
  })
  return res
}) as Compiler
