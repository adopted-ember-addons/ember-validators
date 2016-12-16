/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import requireModule from 'ember-require-module';

const {
  assert
} = Ember;

export function validate(type, ...args) {
  let validator = requireModule(`ember-validators/${type}`);

  assert(`Validator not found of type: ${type}.`, validator);

  return validator(...args);
}
