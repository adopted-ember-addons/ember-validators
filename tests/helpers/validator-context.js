import Ember from 'ember';
import Messages from 'ember-validators/messages';

const {
  set
} = Ember;

export default {
  createErrorMessage(type, value, options) {
    set(options, 'description', Messages.getDescriptionFor(undefined, options));
    return Messages.getMessageFor(type, options);
  }
};
