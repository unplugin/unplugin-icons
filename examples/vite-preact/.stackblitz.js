const { promises } = require('node:fs')

updatePackageJson()

async function updatePackageJson() {
  const filename = './package.json'
  try {
    const contents = await promises.readFile(filename, 'utf-8')
    const updatedContent = contents
      .replace('workspace:*', 'latest')
      .replace('"vite-plugin-inspect": "^0.7.38"', `"vite-plugin-inspect": "^0.7.38",
    "@svgr/plugin-jsx": "^8.1.0"`)

    await promises.writeFile(filename, updatedContent)
  }
  catch (err) {
    console.error(err)
  }
}
