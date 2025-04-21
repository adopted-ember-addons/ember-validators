import { type IValidationError } from './utils/validation-error.ts';
type IOptions = {
    presence: boolean;
    ignoreBlank?: boolean;
};
/**
 *  @class Presence
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.presence If true validates that the given value is not empty,
 *                                   if false, validates that the given value is empty.
 * @param {Boolean} options.ignoreBlank If true, treats an empty or whitespace string as not present
 * @param {Object} model
 * @param {String} attribute
 */
export default function validatePresence(value: unknown, options: IOptions, model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export {};
