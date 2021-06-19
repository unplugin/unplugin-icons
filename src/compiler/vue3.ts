/* eslint-disable @typescript-eslint/no-var-requires */

export function Vue3Compiler(svg: string, name: string, icon: string) {
  const { compileTemplate } = require('@vue/compiler-sfc')

  let { code } = compileTemplate({
    source: svg,
    id: `${name}:${icon}`,
    filename: `${name}-${icon}.vue`,
  })

  code = code.replace(/^export /g, '')
  code += '\n\nexport default { name: ' + `'${name}-${icon}',` + ' render }'
  code += '\n/* vite-plugin-components disabled */'

  return code
}
