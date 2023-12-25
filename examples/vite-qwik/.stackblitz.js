import { promises as fsPromises } from 'node:fs'

updatePackageJson()

async function updatePackageJson() {
  let filename = './package.json'
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8')
    const updatedContent = contents
      .replace('workspace:*', 'latest')
      .replace('"eslint": "8.48.0",', '"eslint": "8.45.0",')
      .replace('"eslint-plugin-qwik": "1.2.10",', '"eslint-plugin-qwik": "1.2.11",')
      .replace('"@svgx/core": "^1.0.1",', '"@svgr/core": "^8.1.0", "@svgr/plugin-jsx": "^8.1.0",')
    await fsPromises.writeFile(filename, updatedContent)
    filename = './vite.config.ts'
    const viteConfigTs = await fsPromises.readFile(filename, 'utf-8')
    await fsPromises.writeFile(filename, viteConfigTs.replace('compiler: \'qwik\',', 'compiler: \'jsx\', jsx: \'qwik\','))
  }
  catch (err) {
    console.error(err)
  }
}
