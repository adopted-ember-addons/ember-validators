/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';
import unwrapProxy from 'ember-validators/utils/unwrap-proxy';

const {
  assert,
  isEmpty,
  isPresent,
  getProperties
} = Ember;

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
  let { presence, ignoreBlank } = getProperties(options, ['presence', 'ignoreBlank']);
  let v = unwrapProxy(value);
  let _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

  assert(`[validator:presence] [${attribute}] option 'presence' is required`, isPresent(presence));

  if (presence === true && !_isPresent) {
    return validationError('present', value, options);
  }

  if (presence === false && _isPresent) {
    return validationError('blank', value, options);
  }

  return true;
}
