import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import { isPresent } from '@ember/utils';
import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

interface IOptions {
  collection: boolean;
}

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
export default function validateCollection(
  value: unknown,
  options: IOptions,
  _model: object,
  attribute: string,
): true | IValidationError<unknown, IOptions> {
  const collection = options.collection;

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
