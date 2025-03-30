import { get } from '@ember/object';
import validationError from './utils/validation-error.js';

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
function validateDsError(value, options, model, attribute) {
  const {
    path,
    key
  } = getPathAndKey(attribute);
  const errors = get(model, path);
  if (errors && errors.has && errors.has(key)) {
    const errorsFor = errors.errorsFor(key);
    return validationError('ds', null, options, errorsFor.length ? errorsFor[errorsFor.length - 1].message : []);
  }
  return true;
}
function getPathAndKey(attribute) {
  const path = attribute.split('.');
  const key = path.pop();
  path.push('errors');
  return {
    path: path.join('.'),
    key
  };
}

export { validateDsError as default, getPathAndKey };
//# sourceMappingURL=ds-error.js.map
