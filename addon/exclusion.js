/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  get,
  typeOf,
  isEmpty,
  assert,
  getProperties
} = Ember;

/**
 *  @class Exclusion
 *  @module Validators
 */
export default function validateExclusion(value, options, model, attribute) {
  let array = get(options, 'in');
  let { range, allowBlank } = getProperties(options, ['range', 'allowBlank']);

  assert(`[validator:exclusion] [${attribute}] no options were passed in`, !isEmpty(Object.keys(options)));

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (array && array.indexOf(value) !== -1) {
    return validationError('exclusion', value, options);
  }

  if (range && range.length === 2) {
    let [ min, max ] = range;
    let equalType = typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);

    if (equalType && min <= value && value <= max) {
      return validationError('exclusion', value, options);
    }
  }

  return true;
}
