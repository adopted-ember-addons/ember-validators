import { isEmpty, isNone } from '@ember/utils';
import { set } from '@ember/object';
import validationError from 'ember-validators/utils/validation-error';
import moment from 'moment';

/**
 * @class Date
 * @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {String} options.before The specified date must be before this date
 * @param {String} options.onOrBefore The specified date must be on or before this date
 * @param {String} options.after The specified date must be after this date
 * @param {String} options.onOrAfter The specified date must be on or after this date
 * @param {String} options.precision Limit the comparison check to a specific granularity.
 *                                   Possible Options: [`year`, `month`, `week`, `day`, `hour`, `minute`, `second`].
 * @param {String} options.format Input value date format
 * @param {String} options.errorFormat Error output date format. Defaults to `MMM Do, YYYY`
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateDate(value, options) {
  if (!moment) {
    throw new Error('MomentJS is required to use the Date validator.');
  }

  let errorFormat = options.errorFormat || 'MMM Do, YYYY';
  let { format, precision, allowBlank } = options;
  let { before, onOrBefore, after, onOrAfter } = options;
  let date;

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (format) {
    date = parseDate(value, format, true);

    // Check to see if the passed date is actually a valid date.
    // This can be done by disabling the strict parsing
    const isActualDate = parseDate(value, format).isValid();

    if (!isActualDate) {
      return validationError('date', value, options);
    } else if (!date.isValid()) {
      return validationError('wrongDateFormat', value, options);
    }
  } else {
    date = parseDate(value);

    if (!date.isValid()) {
      return validationError('date', value, options);
    }
  }

  if (before) {
    before = parseDate(before, format);

    if (!date.isBefore(before, precision)) {
      set(options, 'before', before.format(errorFormat));
      return validationError('before', value, options);
    }
  }

  if (onOrBefore) {
    onOrBefore = parseDate(onOrBefore, format);

    if (!date.isSameOrBefore(onOrBefore, precision)) {
      set(options, 'onOrBefore', onOrBefore.format(errorFormat));
      return validationError('onOrBefore', value, options);
    }
  }

  if (after) {
    after = parseDate(after, format);

    if (!date.isAfter(after, precision)) {
      set(options, 'after', after.format(errorFormat));
      return validationError('after', value, options);
    }
  }

  if (onOrAfter) {
    onOrAfter = parseDate(onOrAfter, format);

    if (!date.isSameOrAfter(onOrAfter, precision)) {
      set(options, 'onOrAfter', onOrAfter.format(errorFormat));
      return validationError('onOrAfter', value, options);
    }
  }

  return true;
}

export function parseDate(date, format, useStrict = false) {
  if (date === 'now' || isEmpty(date)) {
    return moment();
  }

  return isNone(format)
    ? moment(new Date(date))
    : moment(date, format, useStrict);
}
