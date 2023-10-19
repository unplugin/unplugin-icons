const { promises } = require('node:fs')

updatePackageJson()

async function updatePackageJson() {
  const filename = './package.json'
  try {
    const contents = await promises.readFile(filename, 'utf-8')
    let updatedContent = contents.replace('workspace:*', 'latest')
    if (!updatedContent.includes('"vue-template-compiler"')) {
      updatedContent = updatedContent.replace('"vite": "^4.4.9"', `"vite": "^4.4.9",
    "vue-template-compiler": "^2.6.12",
    "vue-template-es2015-compiler": "^1.9.0"`)
    }

    await promises.writeFile(filename, updatedContent)
  }
  catch (err) {
    console.error(err)
  }
}
