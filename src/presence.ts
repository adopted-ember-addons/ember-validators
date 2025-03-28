import { assert } from '@ember/debug';
import { isPresent, isEmpty } from '@ember/utils';
import validationError from './utils/validation-error.js';
import unwrapProxy from './utils/unwrap-proxy.js';

/**
 *  @class Presence
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.presence If true validates that the given value is not empty,
 *                                   if false, validates that the given value is empty.
 * @param {Boolean} options.ignoreBlank If true, treats an empty or whitespace string as not present
 * @param {Object} model
 * @param {String} attribute
 */
export default function validatePresence(value, options, model, attribute) {
  let { presence, ignoreBlank } = options;
  let v = unwrapProxy(value);
  let _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

  assert(
    `[validator:presence] [${attribute}] option 'presence' is required`,
    isPresent(presence),
  );

  if (presence === true && !_isPresent) {
    return validationError('blank', value, options);
  }

  if (presence === false && _isPresent) {
    return validationError('present', value, options);
  }

  return true;
}
