import { promises as fs } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import jc from '@iconify/json/collections.json'

(async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url))
  const file = resolve(__dirname, '../src/core/icon-sets.json')
  console.log('[prebuild]', basename(file))
  await fs.writeFile(file, `${JSON.stringify(Object.keys(jc).sort(), null, 2)}\n`)
})()
