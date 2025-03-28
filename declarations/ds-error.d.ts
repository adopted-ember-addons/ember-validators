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
export default function validateDsError(value: Any, options: Object, model: Object, attribute: string): true | {
    type: any;
    value: any;
    context: any;
    message: any;
};
export function getPathAndKey(attribute: any): {
    path: any;
    key: any;
};
