import { get } from '@ember/object';
import { isNone } from '@ember/utils';
import validationError from 'ember-validators/utils/validation-error';
import DS from 'ember-data';

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
  if (!DS) {
    throw new Error('Ember-Data is required to use the DS Error validator.');
  }

  let { path, key } = getPathAndKey(attribute);

  let errors = model[path];

  if (!isNone(errors) && errors instanceof DS.Errors && errors.has(key)) {
    return validationError(
      'ds',
      null,
      options,
      get(errors.errorsFor(key), 'lastObject.message')
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
