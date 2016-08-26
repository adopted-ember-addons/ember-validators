import Ember from 'ember';
import validateCollection from 'ember-validators/collection';
import validateConfirmation from 'ember-validators/confirmation';
import validateDate from 'ember-validators/date';
import validateDsError from 'ember-validators/ds-error';
import validateExclusion from 'ember-validators/exclusion';
import validateFormat from 'ember-validators/format';
import validateInclusion from 'ember-validators/inclusion';
import validateLength from 'ember-validators/length';
import validateNumber from 'ember-validators/number';
import validatePresence from 'ember-validators/presence';

const {
  assert,
  String: { classify }
} = Ember;

const Validators = {
  validateCollection,
  validateConfirmation,
  validateDate,
  validateDsError,
  validateExclusion,
  validateFormat,
  validateInclusion,
  validateLength,
  validateNumber,
  validatePresence
};

export function validate(type, ...args) {
  const validatorType = classify(`validate-${type}`);
  const validator = Validators[validatorType];

  assert(`Validator not found of type: ${type}.`, validator);

  return validator(...args);
}

export default Validators;
