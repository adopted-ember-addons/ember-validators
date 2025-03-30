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
function validateCollection(value, options, _model, attribute) {
  const collection = options.collection;
  assert(`[validator:collection] [${attribute}] option 'collection' is required`, isPresent(collection));
  if (collection === true && !isArray(value)) {
    return validationError('collection', value, options);
  }
  if (collection === false && isArray(value)) {
    return validationError('singular', value, options);
  }
  return true;
}

export { validateCollection as default };
//# sourceMappingURL=collection.js.map
