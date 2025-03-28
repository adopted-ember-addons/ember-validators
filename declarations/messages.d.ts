declare namespace _default {
    let _regex: RegExp;
    let defaultDescription: string;
    /**
     * Get a description for a specific attribute. This is a hook
     * for i18n solutions to retrieve attribute descriptions from a translation
     * @method getDescriptionFor
     * @param  {String} attribute
     * @param  {Object} options
     * @return {String}
     */
    function getDescriptionFor(attribute: string, context?: {}): string;
    /**
     * Get a message with a given type
     * @method getMessageFor
     * @param  {String} type
     * @param  {Object} context
     * @return {String}
     */
    function getMessageFor(type: string, context?: Object): string;
    /**
     * Regex replace all placeholders with their given context
     * @method formatMessage
     * @param  {String} message
     * @param  {Object} context
     * @return {String}
     */
    function formatMessage(message: string, context?: Object): string;
    let accepted: string;
    let after: string;
    let before: string;
    let blank: string;
    let collection: string;
    let confirmation: string;
    let date: string;
    let email: string;
    let empty: string;
    let equalTo: string;
    let even: string;
    let exclusion: string;
    let greaterThan: string;
    let greaterThanOrEqualTo: string;
    let inclusion: string;
    let invalid: string;
    let lessThan: string;
    let lessThanOrEqualTo: string;
    let notAnInteger: string;
    let notANumber: string;
    let odd: string;
    let onOrAfter: string;
    let onOrBefore: string;
    let otherThan: string;
    let phone: string;
    let positive: string;
    let multipleOf: string;
    let present: string;
    let singular: string;
    let tooLong: string;
    let tooShort: string;
    let between: string;
    let url: string;
    let wrongLength: string;
}
export default _default;
