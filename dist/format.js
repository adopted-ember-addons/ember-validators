import { isEmpty, isNone } from '@ember/utils';
import { assert } from '@ember/debug';
import { canInvoke } from './utils/can-invoke.js';
import validationError from './utils/validation-error.js';

/* eslint-disable no-useless-escape */
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
 * @param {Object} model
 * @param {String} attribute
 */
const regularExpressions = {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  phone: /^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,
  url: /(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/
};
function validateFormat(value, options, model, attribute) {
  const {
    regex,
    type,
    inverse = false,
    allowBlank
  } = options;
  assert(`[validator:format] [${attribute}] no options were passed in`, !isEmpty(Object.keys(options)));
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
    Object.assign({}, options, {
      regex: regexTest
    });
  }
  if (!canInvoke(value, 'match') || regexTest && isEmpty(value.match(regexTest)) !== inverse) {
    return validationError(type || 'invalid', value, Object.assign({}, options, {
      regex: regexTest
    }));
  }
  return true;
}
function formatEmailRegex(options) {
  let {
    source
  } = regularExpressions.email;
  const {
    allowNonTld,
    minTldLength
  } = options;
  if (!isNone(minTldLength) && typeof minTldLength === 'number') {
    source = source.replace('[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$', `[a-z0-9]{${minTldLength},}(?:[a-z0-9-]*[a-z0-9])?$`);
  }
  if (allowNonTld) {
    source = source.replace('@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)', '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.?)');
  }
  return new RegExp(source, 'i');
}

export { validateFormat as default, regularExpressions };
//# sourceMappingURL=format.js.map
