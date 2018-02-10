/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';

import { assert } from '@ember/debug';
import { isPresent, isEmpty, isEqual } from '@ember/utils';
import validationError from 'ember-validators/utils/validation-error';

/**
 *  @class Confirmation
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {String} options.on The attribute to confirm against
 * @param {String} options.allowBlank If true, skips validation if the value is empty
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateConfirmation(value, options, model, attribute) {
  let on = get(options, 'on');
  let allowBlank = get(options, 'allowBlank');

  assert(`[validator:confirmation] [${attribute}] option 'on' is required`, isPresent(on));

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (!isEqual(value, get(model, on))) {
    return validationError('confirmation', value, options);
  }

  return true;
}
