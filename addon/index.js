import Ember from 'ember';
import requireModule from 'ember-validators/utils/require-module';

const {
  assert,
} = Ember;

export function validate(type, ...args) {
  const validator = requireModule(`ember-validators/${type}`);

  assert(`Validator not found of type: ${type}.`, validator);

  return validator(...args);
}
