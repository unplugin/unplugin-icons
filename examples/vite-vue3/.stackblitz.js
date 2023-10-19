const { promises } = require('node:fs')

updatePackageJson()

async function updatePackageJson() {
  const filename = './package.json'
  try {
    const contents = await promises.readFile(filename, 'utf-8')
    const updatedContent = contents
      .replace('workspace:*', 'latest')
      .replace('cross-env DEBUG=unplugin-icons:*', '')
    await promises.writeFile(filename, updatedContent)
  }
  catch (err) {
    console.error(err)
  }
}
