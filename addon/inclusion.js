import { assert } from '@ember/debug';
import { isEmpty, typeOf } from '@ember/utils';
import validationError from 'ember-validators/utils/validation-error';

/**
 *  @class Inclusion
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Array} options.in The list of values this attribute could be
 * @param {Array} options.range The range in which the attribute's value should reside in
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateInclusion(value, options, model, attribute) {
  let array = options.in;
  let { range, allowBlank } = options;

  assert(
    `[validator:inclusion] [${attribute}] no options were passed in`,
    !isEmpty(Object.keys(options))
  );

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (array && array.indexOf(value) === -1) {
    return validationError('inclusion', value, options);
  }

  if (range && range.length === 2) {
    let [min, max] = range;
    let equalType =
      typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);

    if (!equalType || min > value || value > max) {
      return validationError('inclusion', value, options);
    }
  }

  return true;
}
