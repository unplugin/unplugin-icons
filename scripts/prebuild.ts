import { basename, resolve } from 'path'
import { promises as fs } from 'fs'
import jc from '@iconify/json/collections.json'

(async () => {
  const file = resolve(__dirname, '../src/core/icon-sets.json')
  console.log('[prebuild]', basename(file))
  await fs.writeFile(file, JSON.stringify(Object.keys(jc)))
})()
