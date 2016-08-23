/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  get,
  assert,
  isEqual,
  isPresent,
} = Ember;

/**
 *  @class Confirmation
 *  @module Validators
 *  @extends Base
 */
export default function validateConfirmation(value, options, model, attribute, context) {
  const on = get(options, 'on');

  assert(`[validator:confirmation] [${attribute}] option 'on' is required`, isPresent(on));

  if (!isEqual(value, get(model, on))) {
    return context.createErrorMessage('confirmation', value, options);
  }

  return true;
}
