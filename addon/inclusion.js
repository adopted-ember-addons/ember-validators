/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  get,
  typeOf,
  assert,
  isEmpty,
  getProperties
} = Ember;

/**
 *  @class Inclusion
 *  @module Validators
 */
export default function validateInclusion(value, options, model, attribute) {
  const array = get(options, 'in');
  const { range, allowBlank } = getProperties(options, ['range', 'allowBlank']);

  assert(`[validator:inclusion] [${attribute}] no options were passed in`, !isEmpty(Object.keys(options)));

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (array && array.indexOf(value) === -1) {
    return validationError('inclusion', value, options);
  }

  if (range && range.length === 2) {
    const min = range[0];
    const max = range[1];
    const equalType = typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);

    if (!equalType || min > value || value > max) {
      return validationError('inclusion', value, options);
    }
  }

  return true;
}
