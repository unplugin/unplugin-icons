const { promises } = require('node:fs')

updatePackageJson()

async function updatePackageJson() {
  const filename = './package.json'
  try {
    const contents = await promises.readFile(filename, 'utf-8')
    let updatedContent = contents.replace('workspace:*', 'latest')
    if (!updatedContent.includes('"@svgr/plugin-jsx"')) {
      updatedContent = updatedContent.replace('"unplugin-icons": "latest"', `"unplugin-icons": "latest",
    "@svgr/plugin-jsx": "^8.1.0"`)
    }

    await promises.writeFile(filename, updatedContent)
  }
  catch (err) {
    console.error(err)
  }
}
