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
export default function validateInclusion(value: Any, options: {
    allowBlank: boolean;
    in: any[];
    range: any[];
}, model: Object, attribute: string): true | {
    type: any;
    value: any;
    context: any;
    message: any;
};
