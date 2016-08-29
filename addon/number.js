/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  get,
  isEmpty,
  getProperties
} = Ember;

/**
 *  @class Number
 *  @module Validators
 */
export default function validateNumber (value, options) {
  const numValue = Number(value);
  const optionKeys = Object.keys(options);
  const { allowBlank, allowString, integer } = getProperties(options, ['allowBlank', 'allowString', 'integer']);

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (typeof value === 'string' && (isEmpty(value) || !allowString)) {
    return validationError('notANumber', value, options);
  }

  if (!isNumber(numValue)) {
    return validationError('notANumber', value, options);
  }

  if (integer && !isInteger(numValue)) {
    return validationError('notAnInteger', value, options);
  }

  for (let i = 0; i < optionKeys.length; i++) {
    const type = optionKeys[i];
    const returnValue = _validateType(type, options, numValue);

    if (typeof returnValue !== 'boolean') {
      return returnValue;
    }
  }

  return true;
}

function _validateType(type, options, value) {
  const expected = get(options, type);
  const actual = value;

  if (type === 'is' && actual !== expected) {
    return validationError('equalTo', value, options);
  } else if (type === 'lt' && actual >= expected) {
    return validationError('lessThan', value, options);
  } else if (type === 'lte' && actual > expected) {
    return validationError('lessThanOrEqualTo', value, options);
  } else if (type === 'gt' && actual <= expected) {
    return validationError('greaterThan', value, options);
  } else if (type === 'gte' && actual < expected) {
    return validationError('greaterThanOrEqualTo', value, options);
  } else if (type === 'positive' && actual < 0) {
    return validationError('positive', value, options);
  } else if (type === 'odd' && actual % 2 === 0) {
    return validationError('odd', value, options);
  } else if (type === 'even' && actual % 2 !== 0) {
    return validationError('even', value, options);
  }

  return true;
}

/*
  Use polyfills instead of Number.isNaN or Number.isInteger to support IE & Safari
 */

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
