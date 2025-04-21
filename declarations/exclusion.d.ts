import { type IValidationError } from './utils/validation-error.ts';
interface IOptions {
    allowBlank?: boolean;
    in?: unknown[];
    range: [min: number, max: number];
}
/**
 *  @class Exclusion
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Array} options.in The list of values this attribute should not be
 * @param {Array} options.range The range in which the attribute's value should not reside in
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateExclusion(value: unknown, options: IOptions, model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export {};
