import { set } from '@ember/object';
import Messages from 'ember-validators/messages';

export default function processResult(result) {
  if (result && typeof result === 'object') {
    let { type, context, message } = result;

    if (message) {
      return message;
    }

    set(context, 'description', Messages.getDescriptionFor(undefined, context));
    return Messages.getMessageFor(type, context);
  }

  return result;
}
