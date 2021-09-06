/* eslint-disable @typescript-eslint/no-var-requires */

export function Vue3Compiler(svg: string, collection: string, icon: string) {
  const { compileTemplate } = require('@vue/compiler-sfc')

  // https://v3.vuejs.org/api/directives.html#v-pre
  svg = svg.replace('<svg ', '<svg v-pre ')

  let { code } = compileTemplate({
    source: svg,
    id: `${collection}:${icon}`,
    filename: `${collection}-${icon}.vue`,
  })

  code = code.replace(/^export /g, '')
  code += '\n\nexport default { name: ' + `'${collection}-${icon}',` + ' render }'
  code += '\n/* vite-plugin-components disabled */'

  return code
}
