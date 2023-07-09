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
  const toJsxComponent = svgx.toJsxComponent
  const res = toJsxComponent(svg, {
    ...mergedOptions,
    defaultExport: true,
  })
  return res
}) as Compiler
