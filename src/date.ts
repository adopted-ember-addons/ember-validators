import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

type DateTimeFormatOptions = Parameters<typeof Intl.DateTimeFormat>[1];

interface IOptions {
  allowBlank?: boolean;
  before?: string | Date;
  onOrBefore?: string | Date;
  after?: string | Date;
  onOrAfter?: string | Date;
  format?: DateTimeFormatOptions;
  errorFormat?: DateTimeFormatOptions;
  locale?: string;
}

/**
 * @class Date
 * @module Validators
 */

/**
 * @method validate
 * @param {String|Date} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {String|Date} options.before The specified date must be before this date
 * @param {String|Date} options.onOrBefore The specified date must be on or before this date
 * @param {String|Date} options.after The specified date must be after this date
 * @param {String|Date} options.onOrAfter The specified date must be on or after this date
 * @param {String} options.format Input value date format - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 *  - { dateStyle: 'long' } or { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
 *  If you need to obtain precision (just compare years), use { year: 'numeric' }
 * @param {String} options.errorFormat Error output date format. Defaults to options.format or { dateStyle: 'long' }
 */
export default function validateDate(
  value: number | string | Date,
  options: IOptions,
): true | IValidationError<number | string | Date, IOptions> {
  const { locale = 'en-us', format, allowBlank } = options;
  const { before, onOrBefore, after, onOrAfter } = options;

  const errorFormat = options.errorFormat || format || { dateStyle: 'long' };

  if ((allowBlank && value === null) || value === undefined || value === '') {
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
    date = parseAsDate(value, format);
  }

  if (before) {
    const beforeCompare = parseAsDate(before, format);

    if (!isBefore(date, beforeCompare)) {
      return validationError(
        'before',
        value,
        Object.assign({}, options, {
          before: parseDateError(beforeCompare, errorFormat, locale),
        }),
      );
    }
  }

  if (onOrBefore) {
    const onOrBeforeCompare = parseAsDate(onOrBefore, format);

    if (!isSameOrBefore(date, onOrBeforeCompare)) {
      return validationError(
        'onOrBefore',
        value,
        Object.assign({}, options, {
          onOrBefore: parseDateError(onOrBeforeCompare, errorFormat, locale),
        }),
      );
    }
  }

  if (after) {
    const afterCompare = parseAsDate(after, format);

    if (!isAfter(date, afterCompare)) {
      return validationError(
        'after',
        value,
        Object.assign({}, options, {
          after: parseDateError(afterCompare, errorFormat, locale),
        }),
      );
    }
  }

  if (onOrAfter) {
    const onOrAfterCompare = parseAsDate(onOrAfter, format);

    if (!isSameOrAfter(date, onOrAfterCompare)) {
      return validationError(
        'onOrAfter',
        value,
        Object.assign({}, options, {
          onOrAfter: parseDateError(onOrAfterCompare, errorFormat, locale),
        }),
      );
    }
  }

  return true;
}

/**
 * This is a forcing function.  If `format` provided, date and comparison date will be in String format.  Otherwise, instances of Date.
 * I don't think there is a need to force iso8601 strings.
 * @function parseDate
 * @param {Date|String} date
 * @param {Object} format - { dateStyle: 'long' } or { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
 * If you need to obtain precision (just compare years), use { year: 'numeric' }.
 * @param {String} locale
 * @returns {Date|String}
 */
export function parseDate(
  date: string | number | Date,
  format?: DateTimeFormatOptions,
  locale?: string | string[],
): string | Date {
  if (format) {
    // new Date("2015") will give the last day in 2014.  This is problematic
    const yearOnly = isYearFormat(format);

    if (!(date instanceof Date)) {
      // format date into string
      // we have already checked this a valid date
      const d = yearOnly ? new Date(date as number, 0) : new Date(date);
      return new Intl.DateTimeFormat(locale, format).format(d);
    }

    // format date into string
    const d = yearOnly ? new Date(date.getFullYear(), 0) : date;
    return new Intl.DateTimeFormat(locale, format).format(d);
  } else {
    // Date constructor accepts a variety of formats including properly represented strings and Date instances.
    // However, a variety of formats return an "Invalid Date" literal including DD/MM/YYYY
    return new Date(date);
  }
}

function parseDateError(
  date: string | number | Date,
  format?: DateTimeFormatOptions,
  locale?: string | string[],
) {
  return parseDate(date, format, locale);
}

function parseAsDate(
  date: string | number | Date,
  format?: DateTimeFormatOptions,
): Date {
  if (format && isYearFormat(format)) {
    return new Date(parseDate(date, format, 'en-us') as unknown as number, 0);
  }
  return new Date(parseDate(date, format, 'en-us'));
}

function isValidDate(d: unknown): boolean {
  return d instanceof Date && !isNaN(d as unknown as number);
}

function isSame(date: Date, comp: Date): boolean {
  return date.getTime() === comp.getTime();
}

function isBefore(date: Date, comp: Date): boolean {
  return date < comp;
}

function isAfter(date: Date, comp: Date): boolean {
  return date > comp;
}

function isSameOrAfter(date: Date, comp: Date): boolean {
  return isSame(date, comp) || isAfter(date, comp);
}

function isSameOrBefore(date: Date, comp: Date): boolean {
  return isSame(date, comp) || isBefore(date, comp);
}

function isYearFormat(format: object): format is { year: string } {
  return Object.keys(format).length === 1 && 'year' in format;
}
