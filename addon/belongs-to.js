/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import isPromise from 'ember-cp-validators/utils/is-promise';

const {
  get
} = Ember;


/**
 *  @class Belongs To
 *  @module Validators
 *  @extends Base
 */
export default function validateBelongsTo(value) {
  if (value) {
    if (isPromise(value)) {
      return value.then(model => model ? get(model, 'validations') : true);
    }
    return get(value, 'validations');
  }

  return true;
}
