import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import requireModule from 'ember-require-module';

export function validate(type, ...args) {
  let validator = requireModule(`ember-validators/${type}`);

  assert(`Validator not found of type: ${type}.`, isPresent(validator));

  return validator(...args);
}
