import { type IValidationError } from './utils/validation-error.ts';
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
export default function validateDate(value: number | string | Date, options: IOptions): true | IValidationError<number | string | Date, IOptions>;
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
export declare function parseDate(date: string | number | Date, format?: DateTimeFormatOptions, locale?: string | string[]): string | Date;
export {};
