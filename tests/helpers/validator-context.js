import Ember from 'ember';
import Messages from 'ember-validators/messages';

const {
  set
} = Ember;

const assign = Ember.assign || Ember.merge;

export default {
  createErrorMessage(type, value, options) {
    set(options, 'description', Messages.getDescriptionFor(undefined, options));
    return Messages.getMessageFor(type, options);
  },

  cloneOptions(o) {
    return assign({}, o);
  }
};
