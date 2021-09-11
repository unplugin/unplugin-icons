/* eslint-disable @typescript-eslint/no-var-requires */

export async function SvelteCompiler(svg: string, collection: string, icon: string) {
  const svelte = require('svelte/compiler')

  const { js } = svelte.compile(svg, {
    filename: `${collection}-${icon}.svelte`,
    generate: 'dom',
    css: false,
    namespace: 'svg',
  })

  return js.code
}
