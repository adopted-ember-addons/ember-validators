import { type IValidationError } from './utils/validation-error.ts';
type IOptions = {
    allowBlank?: boolean;
    allowNone?: boolean;
    useBetweenMessage?: boolean;
    is?: number;
    min?: number;
    max?: number;
};
/**
 *  @class Length
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowNone If true, skips validation if the value is null or undefined. __Default: true__
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Boolean} options.useBetweenMessage If true, uses the between error message when `max` and `min` are both set
 * @param {Number} options.is The exact length the value can be
 * @param {Number} options.min The minimum length the value can be
 * @param {Number} options.max The maximum length the value can be
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateLength(value: string, options: IOptions): true | IValidationError<string, IOptions>;
export {};
