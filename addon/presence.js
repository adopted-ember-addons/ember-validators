/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
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
 *  @extends Base
 */

export default function validatePresence (context, value, options, model, attribute) {
  const { presence, ignoreBlank } = getProperties(options, ['presence', 'ignoreBlank']);
  const v = unwrapProxy(value);
  const _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

  assert(`[validator:presence] [${attribute}] option 'presence' is required`, isPresent(presence));

  if (presence === true && !_isPresent) {
    return context.createErrorMessage('blank', value, options);
  }

  if (presence === false && _isPresent) {
    return context.createErrorMessage('present', value, options);
  }

  return true;
}
