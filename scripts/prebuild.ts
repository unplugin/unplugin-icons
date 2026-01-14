import fs from 'node:fs'
import { basename, resolve } from 'node:path'
import jc from '@iconify/json/collections.json' with { type: 'json' }

const file = resolve(import.meta.dirname, '../src/core/icon-sets.json')
console.log('[prebuild]', basename(file))
fs.writeFileSync(file, `${JSON.stringify(Object.keys(jc).sort(), null, 2)}\n`)
