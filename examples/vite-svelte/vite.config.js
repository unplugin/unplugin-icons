import process from 'node:process'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

const options = process.env.CUSTOM_COMPILER === 'true'
  ? {
      compiler: {
        extension: 'svelte',
        compiler: compilerFactory(),
      },
    }
  : { compiler: 'svelte' }

export default defineConfig({
  plugins: [
    svelte(),
    Icons(options),
  ],
})

function customSvelteCompiler(svg) {
  const openTagStart = svg.indexOf('<svg ')
  const openTagEnd = svg.indexOf('>', openTagStart)
  const closeTagStart = svg.lastIndexOf('</svg')
  const attributes = svg.slice(openTagStart + 5, openTagEnd)
  const content = svg.slice(openTagEnd + 1, closeTagStart)
  return `<script>
  import CustomSvg from "/src/CustomSvg.svelte";
  const content=\`${content.replace(/`/g, '&#96;')}\`;
</script>
<CustomSvg ${attributes} {...$$props} {content}/>
`
}

// to show how to use async
async function compilerFactory() {
  return Promise.resolve(customSvelteCompiler)
}
