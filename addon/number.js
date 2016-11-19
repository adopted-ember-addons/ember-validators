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

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Boolean} options.allowString If true, validator will accept string representation of a number
 * @param {Boolean} options.integer Number must be an integer
 * @param {Boolean} options.positive Number must be greater than 0
 * @param {Boolean} options.odd Number must be odd
 * @param {Boolean} options.even Number must be even
 * @param {Number} options.is Number must be equal to this value
 * @param {Number} options.lt Number must be less than this value
 * @param {Number} options.lte Number must be less than or equal to this value
 * @param {Number} options.gt Number must be greater than this value
 * @param {Number} options.gte Number must be greater than or equal to this value
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateNumber(value, options) {
  if (typeof value === 'string') {
    value = value.replace(/,/g, '.');
  }

  let numValue = Number(value);
  let optionKeys = Object.keys(options);
  let { allowBlank, allowString, integer } = getProperties(options, ['allowBlank', 'allowString', 'integer']);

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
    let type = optionKeys[i];
    let returnValue = _validateType(type, options, numValue);

    if (typeof returnValue !== 'boolean') {
      return returnValue;
    }
  }

  return true;
}

function _validateType(type, options, value) {
  let expected = get(options, type);
  let actual = value;

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
