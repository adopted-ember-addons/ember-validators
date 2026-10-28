import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { isPresent, isEmpty, isEqual } from '@ember/utils';
import validationError from './utils/validation-error.js';

/**
 *  @class Confirmation
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {String} options.on The attribute to confirm against
 * @param {String} options.allowBlank If true, skips validation if the value is empty
 * @param {Object} model
 * @param {String} attribute
 */
function validateConfirmation(value, options, model, attribute) {
  const on = options.on;
  const allowBlank = options.allowBlank;
  assert(`[validator:confirmation] [${attribute}] option 'on' is required`, isPresent(on));
  if (allowBlank && isEmpty(value)) {
    return true;
  }
  if (!isEqual(value, get(model, on))) {
    return validationError('confirmation', value, options);
  }
  return true;
}

export { validateConfirmation as default };
//# sourceMappingURL=confirmation.js.map
