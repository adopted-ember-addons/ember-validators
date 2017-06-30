import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  redirect() {
    window.location.replace(`${ENV.rootURL}docs`);
  }
});
