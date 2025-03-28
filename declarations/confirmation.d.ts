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
export default function validateConfirmation(value: Any, options: {
    on: string;
    allowBlank: string;
}, model: Object, attribute: string): true | {
    type: any;
    value: any;
    context: any;
    message: any;
};
