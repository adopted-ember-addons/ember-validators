/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import requireModule from 'ember-validators/utils/require-module';
import validatorsCache from 'ember-validators/-private/validators-cache';

const {
  assert,
  isPresent
} = Ember;

export function validate(type, ...args) {
  let validator;

  if (validatorsCache[type]) {
    validator = validatorsCache[type];
  } else {
    validator = requireModule(`ember-validators/${type}`);
    assert(`Validator not found of type: ${type}.`, isPresent(validator));
    validatorsCache[type] = validator;
  }

  return validator(...args);
}
