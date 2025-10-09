import EmberRouter from '@embroider/router'
import Application from 'ember-strict-application-resolver'

class Router extends EmberRouter {
  location = 'history'
  rootURL = '/'
}

Router.map(() => {
  // Add route declarations here
})

export default class App extends Application {
  modules = {
    './router': Router,
    ...import.meta.glob('./templates/**/*.{gjs,gts}', { eager: true }),
  }
}
