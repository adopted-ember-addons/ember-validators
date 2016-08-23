/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  get,
  assert,
  isNone,
  isEmpty,
  getProperties
} = Ember;

/**
 *  @class Length
 *  @module Validators
 *  @extends Base
 */
export default function validateLength (value, options, model, attribute, context) {
  const { allowNone, allowBlank, is, min, max } = getProperties(options, [ 'allowNone', 'allowBlank', 'is', 'min', 'max' ]);

  assert(`[validator:length] [${attribute}] no options were passed in`, !isEmpty(Object.keys(options)));

  if (isNone(value)) {
    return allowNone ? true : context.createErrorMessage('invalid', value, options);
  }

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (!isNone(is) && is !== get(value, 'length')) {
    return context.createErrorMessage('wrongLength', value, options);
  }

  if (!isNone(min) && min > get(value, 'length')) {
    return context.createErrorMessage('tooShort', value, options);
  }

  if (!isNone(max) && max < get(value, 'length')) {
    return context.createErrorMessage('tooLong', value, options);
  }

  return true;
}
