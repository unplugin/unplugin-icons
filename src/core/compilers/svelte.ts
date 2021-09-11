export async function SvelteCompiler(svg: string, collection: string, icon: string) {
  return `
    const svelte = require('svelte/compiler');
    
    const { js } = svelte.compile(svg, {
      filename: '${collection}-${icon}.svelte',
      generate: 'ssr',
      css: false,
      namespace: 'svg'
    });

    return js.code;
  `
}
