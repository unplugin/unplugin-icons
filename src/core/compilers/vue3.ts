import { importModule } from 'local-pkg'
import { handleSVGId } from '../svgId'
import type { Compiler } from './types'

export const Vue3Compiler = <Compiler>(async(svg: string, collection: string, icon: string) => {
  const { compileTemplate } = await importModule('@vue/compiler-sfc')

  const { injectScripts, svg: handled } = handleSVGId(svg)

  let { code } = compileTemplate({
    source: handled,
    id: `${collection}:${icon}`,
    filename: `${collection}-${icon}.vue`,
  })

  code = code.replace(/^export /gm, '')
  code += `\n\nexport default { name: '${collection}-${icon}', render${injectScripts ? `, data() {${injectScripts};return { idMap }}` : ''} }`
  code += '\n/* vite-plugin-components disabled */'

  return code
})
