import { type IValidationError } from './utils/validation-error.ts';
interface IOptions {
    on: string;
    allowBlank?: boolean;
}
/**
 *  @class Confirmation
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {String} options.on The attribute to confirm against
 * @param {String} options.allowBlank If true, skips validation if the value is empty
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateConfirmation(value: unknown, options: IOptions, model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export {};
