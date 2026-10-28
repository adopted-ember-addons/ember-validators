import { type IValidationError } from './utils/validation-error.ts';
type IOptions = {
    allowBlank?: boolean;
    allowNone?: boolean;
    allowString?: boolean;
    integer?: boolean;
    positive?: boolean;
    odd?: boolean;
    even?: boolean;
    is?: number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    multipleOf?: number;
};
/**
 *  @class Number
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Boolean} options.allowNone If true, skips validation if the value is null or undefined. __Default: true__
 * @param {Boolean} options.allowString If true, validator will accept string representation of a number
 * @param {Boolean} options.integer Number must be an integer
 * @param {Boolean} options.positive Number must be greater than or equal to 0
 * @param {Boolean} options.odd Number must be odd
 * @param {Boolean} options.even Number must be even
 * @param {Number} options.is Number must be equal to this value
 * @param {Number} options.lt Number must be less than this value
 * @param {Number} options.lte Number must be less than or equal to this value
 * @param {Number} options.gt Number must be greater than this value
 * @param {Number} options.gte Number must be greater than or equal to this value
 * @param {Number} options.multipleOf Number must be a multiple of this value
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateNumber(value: string | number, options: IOptions): true | IValidationError<string | number, IOptions>;
export {};
