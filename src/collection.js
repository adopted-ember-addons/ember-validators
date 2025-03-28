import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import { isPresent } from '@ember/utils';
import validationError from './utils/validation-error.js';

/**
 *  @class Collection
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.collection
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateCollection(value, options, model, attribute) {
  let collection = options.collection;

  assert(
    `[validator:collection] [${attribute}] option 'collection' is required`,
    isPresent(collection),
  );

  if (collection === true && !isArray(value)) {
    return validationError('collection', value, options);
  }

  if (collection === false && isArray(value)) {
    return validationError('singular', value, options);
  }

  return true;
}
