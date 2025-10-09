import Application from 'ember-strict-application-resolver';
import EmberRouter from '@embroider/router';
import compatModules from '@embroider/virtual/compat-modules';

class Router extends EmberRouter {
  location = 'history';
  rootURL = '/';
}

Router.map(() => {
  // Add route declarations here
});

export default class App extends Application {
  modules = {
    './router': Router,
    ...import.meta.glob('./templates/**/*.{gjs,gts}', { eager: true }),
  }
}

