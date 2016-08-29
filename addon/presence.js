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

export default function validatePresence (value, options, model, attribute) {
  const { presence, ignoreBlank } = getProperties(options, ['presence', 'ignoreBlank']);
  const v = unwrapProxy(value);
  const _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

  assert(`[validator:presence] [${attribute}] option 'presence' is required`, isPresent(presence));

  if (presence === true && !_isPresent) {
    return validationError('blank', value, options);
  }

  if (presence === false && _isPresent) {
    return validationError('present', value, options);
  }

  return true;
}
