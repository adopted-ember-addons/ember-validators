import { type IValidationError } from './utils/validation-error.ts';
interface IOptions {
    path: string;
    key: boolean;
}
/**
 *  @class DS Error
 *  @module Validators
 */
/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateDsError(value: unknown, options: IOptions, model: object, attribute: string): true | IValidationError<unknown, IOptions>;
export declare function getPathAndKey(attribute: string): {
    path: string;
    key: string;
};
export {};
