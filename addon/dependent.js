/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  A,
  get,
  getWithDefault,
  getProperties,
  assert,
  isNone,
  isEmpty,
  isPresent
} = Ember;

/**
 *  @class Dependent
 *  @module Validators
 *  @extends Base
 */
export default function validate(value, options, model, attribute, context) {
  const { on, allowBlank } = getProperties(options, ['on', 'allowBlank']);

  assert(`[validator:dependent] [${attribute}] option 'on' is required`, isPresent(on));

  if (isNone(model)) {
    return true;
  }

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  const dependentValidations = getWithDefault(options, 'on', A()).map(dependent => get(model, `validations.attrs.${dependent}`));

  if (!isEmpty(dependentValidations.filter(v => !get(v, 'isTruelyValid')))) {
    return context.createErrorMessage('invalid', value, options);
  }

  return true;
}
