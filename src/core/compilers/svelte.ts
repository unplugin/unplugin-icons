/* eslint-disable @typescript-eslint/no-var-requires */
import { Options } from '../../types'

export async function SvelteCompiler(svg: string, collection: string, icon: string, options: Options['svelte'] = {}) {
  const { compile } = await import('svelte/compiler')

  const { js } = compile(svg, {
    filename: `${collection}-${icon}.svelte`,
    format: options.format || 'esm',
    legacy: typeof options.legacy !== 'undefined' ? options.legacy : false,
    generate: process.env.SSR ? 'ssr' : 'dom',
    hydratable: true,
    css: typeof options.css !== 'undefined' ? options.css : true,
    namespace: 'svg',
  })

  return js.code
}
