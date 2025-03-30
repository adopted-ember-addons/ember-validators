import { type IValidationError } from './utils/validation-error.ts';
type IEmailOptions = {
    allowBlank?: boolean;
    type?: 'email';
    inverse?: boolean;
    regex?: RegExp;
    allowNonTld?: boolean;
    minTldLength?: number;
};
type IOptions = IEmailOptions | {
    allowBlank?: boolean;
    type?: 'phone' | 'url';
    inverse?: boolean;
    regex?: RegExp;
};
/**
 *  @class Format
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {String} options.type Can be the one of the following options [`email`, `phone`, `url`]
 * @param {String} options.inverse If true, pass if the value doesn't match the given regex / type
 * @param {Regex} options.regex The regular expression to test against
 * @param {Boolean} options.allowNonTld If true, the predefined regular expression `email` allows non top-level domains
 * @param {Number} options.minTldLength The min length of the top-level domain on the predefined `email` regular expression
 * @param {Object} model
 * @param {String} attribute
 */
export declare const regularExpressions: {
    readonly email: RegExp;
    readonly phone: RegExp;
    readonly url: RegExp;
};
export default function validateFormat(value: unknown, options: IOptions, model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export {};
