import type { ToJsComponentOptions } from '@svgx/core'
import type { Compiler } from './types'
import { camelize } from '@iconify/utils/lib/misc/strings'
import { importPeerModule } from './peer'

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
  const svgx = await importPeerModule('@svgx/core')
  const toJsxComponent = svgx.toJsxComponent
  const res = toJsxComponent(svg, {
    ...mergedOptions,
    defaultExport: true,
  })
  return res
}) as Compiler
