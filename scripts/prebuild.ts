import { basename, resolve } from 'node:path'
import { promises as fs } from 'node:fs'
import jc from '@iconify/json/collections.json'

(async () => {
  const file = resolve(__dirname, '../src/core/icon-sets.json')
  console.log('[prebuild]', basename(file))
  await fs.writeFile(file, `${JSON.stringify(Object.keys(jc).sort(), null, 2)}\n`)
})()
