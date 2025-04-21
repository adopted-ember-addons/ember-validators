import { type IValidationError } from './utils/validation-error.ts';
type IOptions = {
    allowBlank?: boolean;
    in: unknown[];
    range: [min: number, max: number];
};
/**
 *  @class Inclusion
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Array} options.in The list of values this attribute could be
 * @param {Array} options.range The range in which the attribute's value should reside in
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateInclusion(value: unknown, options: IOptions, model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export {};
