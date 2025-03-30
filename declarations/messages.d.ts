/**
 *  @class Messages
 *  @module Validators
 */
declare const _default: {
    /**
     * Regex for matching error message placeholders
     * @private
     * @property _regex
     * @type {RegExp}
     */
    _regex: RegExp;
    /**
     * Default attribute description if one isnt passed into a validator's options
     * @property defaultDescription
     * @type {String}
     */
    defaultDescription: string;
    /**
     * Get a description for a specific attribute. This is a hook
     * for i18n solutions to retrieve attribute descriptions from a translation
     * @method getDescriptionFor
     * @param  {String} attribute
     * @param  {Object} options
     * @return {String}
     */
    getDescriptionFor(attribute: string, context?: {
        description?: string;
    }): string;
    /**
     * Get a message with a given type
     * @method getMessageFor
     * @param  {String} type
     * @param  {Object} context
     * @return {String}
     */
    getMessageFor(type: string, context?: {}): string;
    /**
     * Regex replace all placeholders with their given context
     * @method formatMessage
     * @param  {String} message
     * @param  {Object} context
     * @return {String}
     */
    formatMessage(message: string, context?: Record<string, unknown>): string;
    /**
     * Default validation error message strings
     */
    accepted: string;
    after: string;
    before: string;
    blank: string;
    collection: string;
    confirmation: string;
    date: string;
    email: string;
    empty: string;
    equalTo: string;
    even: string;
    exclusion: string;
    greaterThan: string;
    greaterThanOrEqualTo: string;
    inclusion: string;
    invalid: string;
    lessThan: string;
    lessThanOrEqualTo: string;
    notAnInteger: string;
    notANumber: string;
    odd: string;
    onOrAfter: string;
    onOrBefore: string;
    otherThan: string;
    phone: string;
    positive: string;
    multipleOf: string;
    present: string;
    singular: string;
    tooLong: string;
    tooShort: string;
    between: string;
    url: string;
    wrongLength: string;
};
export default _default;
