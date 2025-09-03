import Application from '@ember/application'
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros'
import config from 'ember-example/config/environment'
import loadInitializers from 'ember-load-initializers'
import Resolver from 'ember-resolver'

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow')
}

export default class App extends Application {
  modulePrefix = config.modulePrefix
  podModulePrefix = config.podModulePrefix
  Resolver = Resolver
}

loadInitializers(App, config.modulePrefix)
