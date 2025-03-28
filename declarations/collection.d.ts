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
export default function validateCollection(value: Any, options: {
    collection: boolean;
}, model: Object, attribute: string): true | {
    type: any;
    value: any;
    context: any;
    message: any;
};
