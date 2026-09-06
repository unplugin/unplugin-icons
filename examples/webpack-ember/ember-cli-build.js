'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const {
  /** @type {import('unplugin-icons/loaders').FileSystemHMRIconLoader} */
  FileSystemHMRIconLoader,
} = require('unplugin-icons/loaders')
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
        devServer: {
          hot: true,
        },
        plugins: [
          Icons({
            compiler: 'ember',
            customCollections: {
              // Ember CLI (which orchestrates the entire process before passing it to Webpack)
              // only monitors changes in very specific directories by default
              // (such as app/, addon/, public/, or tests/).
              ...FileSystemHMRIconLoader('app/custom-a', 'custom'),
            },
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
