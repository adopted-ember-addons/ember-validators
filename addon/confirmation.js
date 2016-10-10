/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  get,
  assert,
  isEqual,
  isPresent
} = Ember;

/**
 *  @class Confirmation
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {String} options.on The attribute to confirm against
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateConfirmation(value, options, model, attribute) {
  let on = get(options, 'on');

  assert(`[validator:confirmation] [${attribute}] option 'on' is required`, isPresent(on));

  if (!isEqual(value, get(model, on))) {
    return validationError('confirmation', value, options);
  }

  return true;
}
