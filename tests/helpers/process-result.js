import Ember from 'ember';
import Messages from 'ember-validators/messages';

const {
  set
} = Ember;

export default function processResult(result) {
  if (result && typeof result === 'object') {
    let { type, context } = result;
    set(context, 'description', Messages.getDescriptionFor(undefined, context));
    return Messages.getMessageFor(type, context);
  }

  return result;
}
