import Ember from 'ember';
import requireModule from 'ember-validators/utils/require-module';
import validatorsCache from 'ember-validators/-private/validators-cache';

const {
  assert,
} = Ember;

export function validate(type, ...args) {
  let validator;

  if(validatorsCache[type]) {
    validator = validatorsCache[type];
  } else {
    validator = requireModule(`ember-validators/${type}`);
    assert(`Validator not found of type: ${type}.`, validator);
    validatorsCache[type] = validator;
  }

  return validator(...args);
}
