import { get } from '@ember/object';
import { isNone } from '@ember/utils';

/**
 *  @class Messages
 *  @module Validators
 */
export default {
  /**
   * Regex for matching error message placeholders
   * @private
   * @property _regex
   * @type {RegExp}
   */
  _regex: /\{(\w+)\}/g,

  /**
   * Default attribute description if one isnt passed into a validator's options
   * @property defaultDescription
   * @type {String}
   */
  defaultDescription: 'This field',

  /**
   * Get a description for a specific attribute. This is a hook
   * for i18n solutions to retrieve attribute descriptions from a translation
   * @method getDescriptionFor
   * @param  {String} attribute
   * @param  {Object} options
   * @return {String}
   */
  getDescriptionFor(
    attribute: string,
    context: { description?: string } = {},
  ): string {
    return context.description || this.defaultDescription;
  },

  /**
   * Get a message with a given type
   * @method getMessageFor
   * @param  {String} type
   * @param  {Object} context
   * @return {String}
   */
  getMessageFor(type: string, context = {}) {
    return this.formatMessage(get(this, type) as string, context);
  },

  /**
   * Regex replace all placeholders with their given context
   * @method formatMessage
   * @param  {String} message
   * @param  {Object} context
   * @return {String}
   */
  formatMessage(
    message: string,
    context: Record<string, unknown> = {},
  ): string {
    let m = message;

    if (isNone(m) || typeof m !== 'string') {
      m = this.invalid;
    }

    return m.replace(
      this._regex,
      (s: string, attr: string) => get(context, attr) as string,
    );
  },

  /**
   * Default validation error message strings
   */
  accepted: '{description} must be accepted',
  after: '{description} must be after {after}',
  before: '{description} must be before {before}',
  blank: "{description} can't be blank",
  collection: '{description} must be a collection',
  confirmation: "{description} doesn't match {on}",
  date: '{description} must be a valid date',
  email: '{description} must be a valid email address',
  empty: "{description} can't be empty",
  equalTo: '{description} must be equal to {is}',
  even: '{description} must be even',
  exclusion: '{description} is reserved',
  greaterThan: '{description} must be greater than {gt}',
  greaterThanOrEqualTo: '{description} must be greater than or equal to {gte}',
  inclusion: '{description} is not included in the list',
  invalid: '{description} is invalid',
  lessThan: '{description} must be less than {lt}',
  lessThanOrEqualTo: '{description} must be less than or equal to {lte}',
  notAnInteger: '{description} must be an integer',
  notANumber: '{description} must be a number',
  odd: '{description} must be odd',
  onOrAfter: '{description} must be on or after {onOrAfter}',
  onOrBefore: '{description} must be on or before {onOrBefore}',
  otherThan: '{description} must be other than {value}',
  phone: '{description} must be a valid phone number',
  positive: '{description} must be positive',
  multipleOf: '{description} must be a multiple of {multipleOf}',
  present: '{description} must be blank',
  singular: "{description} can't be a collection",
  tooLong: '{description} is too long (maximum is {max} characters)',
  tooShort: '{description} is too short (minimum is {min} characters)',
  between: '{description} must be between {min} and {max} characters',
  url: '{description} must be a valid url',
  wrongLength: '{description} is the wrong length (should be {is} characters)',
};
