'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const Icons = require('unplugin-icons/webpack')

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    tests: false,
  })

  const { Webpack } = require('@embroider/webpack')
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticEmberSource: true,
    staticInvokables: true,
    packagerOptions: {
      webpackConfig: {
        plugins: [
          Icons({
            compiler: 'ember',
          }),
        ],
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  })
}
