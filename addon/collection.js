/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  get,
  isArray
} = Ember;

/**
 *  @class Collection
 *  @module Validators
 *  @extends Base
 */
export default function validateCollection(value, options) {
  const collection = get(options, 'collection');

  if (collection === true && !isArray(value)) {
    return validationError('collection', value, options);
  }

  if (collection === false && isArray(value)) {
    return validationError('singular', value, options);
  }

  return true;
}
