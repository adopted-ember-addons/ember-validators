/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  get,
  isEmpty,
  getProperties
} = Ember;

/**
 *  @class Number
 *  @module Validators
 *  @extends Base
 */
export default function validateNumber (value, options, model, attribute, context) {
  const numValue = Number(value);
  const optionKeys = Object.keys(options);
  const { allowBlank, allowString, integer } = getProperties(options, ['allowBlank', 'allowString', 'integer']);

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (typeof value === 'string' && (isEmpty(value) || !allowString)) {
    return context.createErrorMessage('notANumber', value, options);
  }

  if (!isNumber(numValue)) {
    return context.createErrorMessage('notANumber', value, options);
  }

  if (integer && !isInteger(numValue)) {
    return context.createErrorMessage('notAnInteger', value, options);
  }

  for (let i = 0; i < optionKeys.length; i++) {
    const type = optionKeys[i];
    const m = _validateType(type, options, numValue, context);

    if (typeof m === 'string') {
      return m;
    }
  }

  return true;
}

function _validateType(type, options, value, context) {
  const createErrorMessage = context.createErrorMessage;
  const expected = get(options, type);
  const actual = value;

  if (type === 'is' && actual !== expected) {
    return createErrorMessage('equalTo', value, options);
  } else if (type === 'lt' && actual >= expected) {
    return createErrorMessage('lessThan', value, options);
  } else if (type === 'lte' && actual > expected) {
    return createErrorMessage('lessThanOrEqualTo', value, options);
  } else if (type === 'gt' && actual <= expected) {
    return createErrorMessage('greaterThan', value, options);
  } else if (type === 'gte' && actual < expected) {
    return createErrorMessage('greaterThanOrEqualTo', value, options);
  } else if (type === 'positive' && actual < 0) {
    return createErrorMessage('positive', value, options);
  } else if (type === 'odd' && actual % 2 === 0) {
    return createErrorMessage('odd', value, options);
  } else if (type === 'even' && actual % 2 !== 0) {
    return createErrorMessage('even', value, options);
  }

  return true;
}

/* Use polyfills instead of Number.isNaN or Number.isInteger to support IE & Safari */

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
