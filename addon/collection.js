/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  get,
  assert,
  isArray,
  isPresent
} = Ember;

/**
 *  @class Collection
 *  @module Validators
 */
export default function validateCollection(value, options, model, attribute) {
  const collection = get(options, 'collection');

  assert(`[validator:collection] [${attribute}] option 'collection' is required`, isPresent(collection));

  if (collection === true && !isArray(value)) {
    return validationError('collection', value, options);
  }

  if (collection === false && isArray(value)) {
    return validationError('singular', value, options);
  }

  return true;
}
