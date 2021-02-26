import { compileTemplate } from '@vue/compiler-sfc'

export function Vue3Compiler(svg: string, name: string, icon: string) {
  let { code } = compileTemplate({
    source: svg,
    id: `${name}:${icon}`,
    filename: `${name}-${icon}.vue`,
  })

  code = code.replace(/^export /g, '')
  code += '\n\nexport default { render }'
  code += '\n/* vite-plugin-components disabled */'

  return code
}
