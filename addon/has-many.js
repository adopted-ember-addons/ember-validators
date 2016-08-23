/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

 import isPromise from 'ember-validators/utils/is-promise';

/**
 *  @class Has Many
 *  @module Validators
 *  @extends Base
 */
export default function validateHasMany(value) {
  if (value) {
    if (isPromise(value)) {
      return value.then(models => models ? models.map(m => m.get('validations')) : true);
    }
    return value.map(m => m.get('validations'));
  }

  return true;
}
