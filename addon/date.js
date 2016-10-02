/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';
import requireModule from 'ember-validators/utils/require-module';

const moment = requireModule('moment');

if (!moment) {
  throw new Error('MomentJS is required to use the Date validator.');
}

const {
  getWithDefault,
  getProperties,
  isNone,
  isEmpty,
  set
} = Ember;

/**
 *  @class Date
 *  @module Validators
 */

function _parseDate(date, format, useStrict = false) {
  if (date === 'now' || isEmpty(date)) {
    return moment();
  }

  return isNone(format) ? moment(new Date(date)) : moment(date, format, useStrict);
}

export default function validateDate(value, options) {
  const errorFormat = getWithDefault(options, 'errorFormat', 'MMM Do, YYYY');
  const { format, precision, allowBlank } = getProperties(options, ['format', 'precision', 'allowBlank']);
  let { before, onOrBefore, after, onOrAfter } = getProperties(options, ['before', 'onOrBefore', 'after', 'onOrAfter']);
  let date;

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (format) {
    date = _parseDate(value, format, true);
    if (!date.isValid()) {
      return validationError('wrongDateFormat', value, options);
    }
  } else {
    date = _parseDate(value);
    if (!date.isValid()) {
      return validationError('date', value, options);
    }
  }

  if (before) {
    before = _parseDate(before, format);
    if (!date.isBefore(before, precision)) {
      set(options, 'before', before.format(errorFormat));
      return validationError('before', value, options);
    }
  }

  if (onOrBefore) {
    onOrBefore = _parseDate(onOrBefore, format);
    if (!date.isSameOrBefore(onOrBefore, precision))  {
      set(options, 'onOrBefore', onOrBefore.format(errorFormat));
      return validationError('onOrBefore', value, options);
    }
  }

  if (after) {
    after = _parseDate(after, format);
    if (!date.isAfter(after, precision)) {
      set(options, 'after', after.format(errorFormat));
      return validationError('after', value, options);
    }
  }

  if (onOrAfter) {
    onOrAfter = _parseDate(onOrAfter, format);
    if (!date.isSameOrAfter(onOrAfter, precision)) {
      set(options, 'onOrAfter', onOrAfter.format(errorFormat));
      return validationError('onOrAfter', value, options);
    }
  }

  return true;
}
