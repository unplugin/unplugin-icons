import type { Compiler } from './types'
import { importModule } from 'local-pkg'
import { handleSVGId } from '../svgId'

export const Vue3Compiler = (async (svg: string, collection: string, icon: string) => {
  const { compileTemplate } = await importModule('@vue/compiler-sfc')

  const { injectScripts, svg: handled } = handleSVGId(svg)

  let { code } = compileTemplate({
    source: handled,
    id: `${collection}:${icon}`,
    filename: `${collection}-${icon}.vue`,
  })

  code = `import { markRaw } from 'vue'\n${code}`
  code = code.replace(/^export /gm, '')
  code += `\n\nexport default markRaw({ name: '${collection}-${icon}', render${
    injectScripts ? `, setup() {${injectScripts};return { idMap }}` : ''
  } })`
  code += '\n/* vite-plugin-components disabled */'

  return code
}) as Compiler
