import { resolve, basename } from 'path'
import { promises as fs } from 'fs'
import fg from 'fast-glob'

async function run() {
  // fix cjs exports
  const files = await fg('*.js', {
    ignore: ['index.js', 'chunk-*'],
    absolute: true,
    cwd: resolve(__dirname, '../dist'),
  })
  for (const file of files) {
    // eslint-disable-next-line no-console
    console.log('[postbuild]', basename(file))
    const name = basename(file, '.js')
    let code = await fs.readFile(file, 'utf8')
    code = code.replace('exports.default =', 'module.exports =')
    code += 'exports.default = module.exports;'
    await fs.writeFile(file, code)
    await fs.writeFile(`${name}.d.ts`, `import './shim-vue'\nexport { default } from './dist/${name}'\n`)
  }
}

run()
