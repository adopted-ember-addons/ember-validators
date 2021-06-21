import Route from '@ember/routing/route';
import ENV from '../config/environment';

export default class IndexRoute extends Route {
  redirect() {
    window.location.replace(`${ENV.rootURL}docs`);
  }
}
