import EmberRouter from '@embroider/router';
import config from 'ember-vite-example/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(() => {
  // Add route declarations here
});
