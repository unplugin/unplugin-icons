import Application from '@ember/application'
import config from 'ember-example/config/environment'
import Resolver from 'ember-resolver'

export default class App extends Application {
  modulePrefix = config.modulePrefix
  podModulePrefix = config.podModulePrefix
  Resolver = Resolver
}
