import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    window.location.replace('/docs');
  }
});
