import { isEmpty } from '@ember/utils';
import { set } from '@ember/object';
import validationError from 'ember-validators/utils/validation-error';

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
  let errorFormat = options.errorFormat || 'MMM Do, YYYY';
  let { locale, format, precision, allowBlank } = options;
  let { before, onOrBefore, after, onOrAfter } = options;
  let date;

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (format) {
    date = parseDate(value, format, locale);

    // Check to see if the passed date is actually a valid date.
    // This can be done by disabling the strict parsing
    const isActualDate = isValidDate(parseDate(value, format, locale));

    if (!isActualDate) {
      return validationError('date', value, options);
    } else if (!isValidDate(date)) {
      return validationError('wrongDateFormat', value, options);
    }
  } else {
    // TODO: what are we doing here?
    date = parseDate(value, null, locale);

    if (!isValidDate(date)) {
      return validationError('date', value, options);
    }
  }

  if (before) {
    before = parseDate(before, format, locale);

    if (!isBefore(date, before, precision)) {
      set(options, 'before', format(before, errorFormat));
      return validationError('before', value, options);
    }
  }

  if (onOrBefore) {
    onOrBefore = parseDate(onOrBefore, format, locale);

    if (!isSameOrBefore(date, onOrBefore, precision)) {
      set(options, 'onOrBefore', format(onOrBefore, errorFormat));
      return validationError('onOrBefore', value, options);
    }
  }

  if (after) {
    after = parseDate(after, format, locale);

    if (!isAfter(date, after, precision)) {
      set(options, 'after', format(after, errorFormat));
      return validationError('after', value, options);
    }
  }

  if (onOrAfter) {
    onOrAfter = parseDate(onOrAfter, format, locale);

    if (!isSameOrAfter(date, onOrAfter, precision)) {
      set(options, 'onOrAfter', onOrAfter.format(errorFormat));
      return validationError('onOrAfter', value, options);
    }
  }

  return true;
}

export function parseDate(date, format, locale) {
  if (date === 'now' || date === null || date === undefined) {
    return new Date();
  }

  return format ? new Date(date) : new Intl.DateTimeFormat(locale, format);
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// WIP naive implementation
// TODO: timezone beware
function isSame(date, comp/*, _precision*/) {
  return date === comp;
}

function isBefore(date, comp/*, _precision*/) {
  return date < comp;
}

function isAfter(date, comp/*, _precision*/) {
  return date > comp;
}

function isSameOrAfter(date, comp/*, _precision*/) {
  return isSame(date, comp) || isAfter(date, comp);
}

function isSameOrBefore(date, comp/*, _precision*/) {
  return isSame(date, comp) || isBefore(date, comp);
}
