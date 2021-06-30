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
 * @param {String} options.format Input value date format - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 *  - { dateStyle: 'long' } or { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
 *  If you need to obtain precision (just compare years), use { year: 'numeric' }
 * @param {String} options.errorFormat Error output date format. Defaults to `MMM Do, YYYY`
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateDate(value, options) {
  let { locale = 'en-us', format, allowBlank } = options;
  let { before, onOrBefore, after, onOrAfter } = options;

  let errorFormat = options.errorFormat || format || { dateStyle: 'long' };

  if (allowBlank && !value) {
    return true;
  }

  let date;

  if (!value) {
    if (format) {
      date = new Intl.DateTimeFormat(locale, format).format(new Date());
    }

    date = new Date();
  } else if (!isValidDate(new Date(value))) {
    return validationError('date', value, options);
  } else {
    date = parseDate(value, format, locale);
  }

  if (before) {
    before = parseDate(before, format, locale);

    if (!isBefore(date, before)) {
      set(options, 'before', parseDate(before, errorFormat, locale));
      return validationError('before', value, options);
    }
  }

  if (onOrBefore) {
    onOrBefore = parseDate(onOrBefore, format, locale);

    if (!isSameOrBefore(date, onOrBefore)) {
      set(options, 'onOrBefore', parseDate(onOrBefore, errorFormat, locale));
      return validationError('onOrBefore', value, options);
    }
  }

  if (after) {
    after = parseDate(after, format, locale);

    if (!isAfter(date, after)) {
      set(options, 'after', parseDate(after, errorFormat, locale));
      return validationError('after', value, options);
    }
  }

  if (onOrAfter) {
    onOrAfter = parseDate(onOrAfter, format, locale);

    if (!isSameOrAfter(date, onOrAfter)) {
      set(options, 'onOrAfter', parseDate(onOrAfter, errorFormat, locale));
      return validationError('onOrAfter', value, options);
    }
  }

  return true;
}

/**
 *
 * @param {Date|String} date
 * @param {Object} format - { dateStyle: 'long' } or { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
 * If you need to obtain precision (just compare years), use { year: 'numeric' }
 * @param {String} locale
 * @returns {Date|String}
 */
export function parseDate(date, format, locale) {
  if (format) {
    // new Date("2015") will give the last day in 2014.  This is problematic
    let yearOnly = Object.keys(format).length === 1 && format.year;

    if (!(date instanceof Date)) {
      // format date into string
      // we have already checked this a valid date
      let d = yearOnly ? new Date(date, 0) : new Date(date);
      return new Intl.DateTimeFormat(locale, format).format(d);
    }

    // format date into string
    let d = yearOnly ? new Date(date.getFullYear(), 0) : new Date(date);
    return new Intl.DateTimeFormat(locale, format).format(d);
  } else {
    // Date constructor accepts a variety of formats including properly represented strings and Date instances.
    // However, a variety of formats return an "Invalid Date" literal including DD/MM/YYYY
    return new Date(date);
  }
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function isSame(date, comp) {
  if (typeof date === 'string') {
    if (typeof comp === 'string') {
      return date === comp;
    }
  }

  return date.getTime() === comp.getTime();
}

function isBefore(date, comp) {
  return date < comp;
}

function isAfter(date, comp) {
  return date > comp;
}

function isSameOrAfter(date, comp) {
  return isSame(date, comp) || isAfter(date, comp);
}

function isSameOrBefore(date, comp) {
  return isSame(date, comp) || isBefore(date, comp);
}
