import { type IValidationError } from './utils/validation-error.ts';
interface IOptions {
    collection: boolean;
}
/**
 *  @class Collection
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.collection
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateCollection(value: unknown, options: IOptions, _model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export {};
