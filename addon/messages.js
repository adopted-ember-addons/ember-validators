/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  get,
  isNone
} = Ember;

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
  getDescriptionFor(attribute, context = {}) {
    return get(context, 'description') || get(this, 'defaultDescription');
  },

  /**
   * Get a message with a given type
   * @method getMessageFor
   * @param  {String} type
   * @param  {Object} context
   * @return {String}
   */
  getMessageFor(type, context = {}) {
    return this.formatMessage(get(this, type), context);
  },

  /**
   * Regex replace all placeholders with their given context
   * @method formatMessage
   * @param  {String} message
   * @param  {Object} context
   * @return {String}
   */
  formatMessage(message, context = {}) {
    let m = message;

    if (isNone(m) || typeof m !== 'string') {
      m = get(this, 'invalid');
    }
    return m.replace(get(this, '_regex'), (s, attr) => get(context, attr));
  },

  /**
   * Default validation error message strings
   */
  accepted: '{description} must be accepted',
  after: '{description} must be after {after}',
  before: '{description} must be before {before}',
  blank: '{description} can\'t be blank',
  collection: '{description} must be a collection',
  confirmation: '{description} doesn\'t match {on}',
  date: '{description} must be a valid date',
  email: '{description} must be a valid email address',
  empty: '{description} can\'t be empty',
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
  present: '{description} must be blank',
  singular: '{description} can\'t be a collection',
  tooLong: '{description} is too long (maximum is {max} characters)',
  tooShort: '{description} is too short (minimum is {min} characters)',
  url: '{description} must be a valid url',
  wrongDateFormat: '{description} must be in the format of {format}',
  wrongLength: '{description} is the wrong length (should be {is} characters)'
};
