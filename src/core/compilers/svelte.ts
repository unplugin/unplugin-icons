/* eslint-disable @typescript-eslint/no-var-requires */

import { Options } from '../../types'

export async function SvelteCompiler(svg: string, collection: string, icon: string, options: Options['svelte'] = {}) {
  const svelte = require('svelte/compiler')

  const { js } = svelte.compile(svg, {
    filename: `${collection}-${icon}.svelte`,
    format: options.format || 'esm',
    legacy: typeof options.legacy !== 'undefined' ? options.legacy : false,
    generate: options.generate || 'dom',
    css: false,
    namespace: 'svg',
  })

  return js.code
}
