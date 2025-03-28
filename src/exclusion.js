import { isEmpty, typeOf } from '@ember/utils';
import { assert } from '@ember/debug';
import validationError from './utils/validation-error.js';

/**
 *  @class Exclusion
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Array} options.in The list of values this attribute should not be
 * @param {Array} options.range The range in which the attribute's value should not reside in
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateExclusion(value, options, model, attribute) {
  let array = options.in;
  let { range, allowBlank } = options;

  assert(
    `[validator:exclusion] [${attribute}] no options were passed in`,
    !isEmpty(Object.keys(options)),
  );

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (array && array.indexOf(value) !== -1) {
    return validationError('exclusion', value, options);
  }

  if (range && range.length === 2) {
    let [min, max] = range;
    let equalType =
      typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);

    if (equalType && min <= value && value <= max) {
      return validationError('exclusion', value, options);
    }
  }

  return true;
}
