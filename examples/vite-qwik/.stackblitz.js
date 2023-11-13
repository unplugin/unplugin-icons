import { promises as fsPromises } from 'node:fs'

updatePackageJson()

async function updatePackageJson() {
  const filename = './package.json'
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8')
    const updatedContent = contents
      .replace('workspace:*', 'latest')
      .replace('"eslint": "8.48.0",', '"eslint": "8.45.0",')
      .replace('"eslint-plugin-qwik": "1.2.10",', '"eslint-plugin-qwik": "1.2.11",')
    await fsPromises.writeFile(filename, updatedContent)
  }
  catch (err) {
    console.error(err)
  }
}
