import validationError from './utils/validation-error.js';
import { get } from '@ember/object';

/**
 *  @class DS Error
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateDsError(value, options, model, attribute) {
  let { path, key } = getPathAndKey(attribute);

  let errors = get(model, path);

  if (errors && errors.has && errors.has(key)) {
    let errorsFor = errors.errorsFor(key);
    return validationError(
      'ds',
      null,
      options,
      errorsFor.length ? errorsFor[errorsFor.length - 1].message : [],
    );
  }

  return true;
}

export function getPathAndKey(attribute) {
  let path = attribute.split('.');
  let key = path.pop();

  path.push('errors');

  return { path: path.join('.'), key };
}
