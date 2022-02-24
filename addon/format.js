import { isEmpty, isNone } from '@ember/utils';
import { assert } from '@ember/debug';

import Ember from 'ember';
import validationError from 'ember-validators/utils/validation-error';

const { canInvoke } = Ember;

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
 * @param {String} options.inverse If true, pass if the value doesn't match the given regex / type
 * @param {Regex} options.regex The regular expression to test against
 * @param {Boolean} options.allowNonTld If true, the predefined regular expression `email` allows non top-level domains
 * @param {Number} options.minTldLength The min length of the top-level domain on the predefined `email` regular expression
 * @param {Any} options.scheme Adds scheme requirements on the predefined regular expression `url`
 * @param {Object} model
 * @param {String} attribute
 */
export const regularExpressions = {
  // eslint-disable-next-line no-useless-escape
  email:
    /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  // eslint-disable-next-line no-useless-escape
  phone:
    /^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,
  // eslint-disable-next-line no-useless-escape
  url: /(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/,
};

export default function validateFormat(value, options, model, attribute) {
  let { regex, type, inverse = false, allowBlank } = options;

  assert(
    `[validator:format] [${attribute}] no options were passed in`,
    !isEmpty(Object.keys(options))
  );

  let regexTest = regex;

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (type && !regex && regularExpressions[type]) {
    regexTest = regularExpressions[type];
  }

  if (type === 'email') {
    if (regexTest === regularExpressions.email) {
      regexTest = formatEmailRegex(options);
    }
    Object.assign({}, options, { regex: regexTest });
  } else if (type === 'url') {
    if (regexTest === regularExpressions.url) {
      regexTest = formatUrlRegex(options);
    }
    Object.assign({}, options, { regex: regexTest });
  }

  if (
    !canInvoke(value, 'match') ||
    (regexTest && isEmpty(value.match(regexTest)) !== inverse)
  ) {
    return validationError(
      type || 'invalid',
      value,
      Object.assign({}, options, { regex: regexTest })
    );
  }

  return true;
}

function formatEmailRegex(options) {
  let { source } = regularExpressions.email;
  let { allowNonTld, minTldLength } = options;

  if (!isNone(minTldLength) && typeof minTldLength === 'number') {
    source = source.replace(
      '[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$',
      `[a-z0-9]{${minTldLength},}(?:[a-z0-9-]*[a-z0-9])?$`
    );
  }

  if (allowNonTld) {
    source = source.replace(
      '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)',
      '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.?)'
    );
  }

  return new RegExp(source, 'i');
}

function formatUrlRegex(options) {
  let { source } = regularExpressions.url;
  let { scheme } = options;

  if (scheme === true) {
    source = `^([a-zA-Z0-9-+&.]+)://${source}`;
  } else if (scheme instanceof Array) {
    source = `^(${scheme.join('|')}){1}://${source}`;
  }

  return new RegExp(source);
}
