/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  get,
  assert,
  isPresent,
  getProperties
} = Ember;

/**
 *  @class Alias
 *  @module Validators
 *  @extends Base
 */
export default function validateAlias(value, options, model, attribute) {
  const { alias, firstMessageOnly } = getProperties(options, ['alias', 'firstMessageOnly']);

  assert(`[validator:alias] [${attribute}] option 'alias' is required`, isPresent(alias));

  const aliasValidation = get(model, `validations.attrs.${alias}`);

  return firstMessageOnly ? get(aliasValidation, 'message') : get(aliasValidation, 'content');
}
