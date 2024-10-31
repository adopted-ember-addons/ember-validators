import { assert } from '@ember/debug';
import { isPresent, isEmpty } from '@ember/utils';
import validationError from 'ember-validators/utils/validation-error';
import unwrapProxy from 'ember-validators/utils/unwrap-proxy';

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
 * @param {Boolean} options.ignoreBlank If true, treats a whitespace string as not present
 * @param {Boolean} options.allowEmpty If true, treats an empty string as present
 * @param {Object} model
 * @param {String} attribute
 */
export default function validatePresence(value, options, model, attribute) {
  let { presence, ignoreBlank, allowEmpty } = options;
  let v = unwrapProxy(value);
  let _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

  if (!_isPresent && allowEmpty && v === '') {
    _isPresent = true;
  }

  assert(
    `[validator:presence] [${attribute}] option 'presence' is required`,
    isPresent(presence)
  );

  if (presence === true && !_isPresent) {
    return validationError('blank', value, options);
  }

  if (presence === false && _isPresent) {
    return validationError('present', value, options);
  }

  return true;
}
