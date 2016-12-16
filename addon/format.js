
/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const {
  set,
  isNone,
  isEmpty,
  assert,
  deprecate,
  getProperties
} = Ember;

/**
 *  @class Format
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {String} options.type Can be the one of the following options [`email`, `phone`, `url`]
 * @param {Regex} options.regex The regular expression to test against
 * @param {Boolean} options.allowNonTld If true, the predefined regular expression `email` allows non top-level domains
 * @param {Boolean} options.minTldLength The min length of the top-level domain on the predefined `email` regular expression
 * @param {Object} model
 * @param {String} attribute
 */
export const regularExpressions = {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  emailOptionalTld: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  phone: /^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,
  url: /(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/
};

export default function validateFormat(value, options, model, attribute) {
  let { regex, type, allowBlank } = getProperties(options, ['regex', 'type', 'allowBlank']);

  assert(`[validator:format] [${attribute}] no options were passed in`, !isEmpty(Object.keys(options)));

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (type === 'email') {
    if (regex === regularExpressions.emailOptionalTld) {
      regex = regularExpressions.email;
      set(options, 'allowNonTld', true);

      // TODO: Remove deprecation in next minor/major version of ember-validators
      deprecate(`[validator:format] [${attribute}] emailOptionalTld regex has been deprecated. Please use the allowNonTld option instead.`, false, {
        id: 'ember.validators.format',
        until: '4.0.0'
      });
    }

    if (regex === regularExpressions.email) {
      regex = formatEmailRegex(options);
    }

    set(options, 'regex', regex);
  }

  if (regex && !regex.test(value)) {
    return validationError(type || 'invalid', value, options);
  }

  return true;
}

function formatEmailRegex(options) {
  let regex = regularExpressions.email;
  let { source } = regex;
  let { allowNonTld, minTldLength } = getProperties(options, ['allowNonTld', 'minTldLength']);

  if (!isNone(minTldLength) && typeof minTldLength === 'number') {
    source = source.replace('[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$', `[a-z0-9]{${minTldLength},}(?:[a-z0-9-]*[a-z0-9])?$`);
  }

  if (allowNonTld) {
    source = source.replace('@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)', '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.?)');
  }

  return new RegExp(source, 'i');
}
