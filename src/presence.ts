import { assert } from '@ember/debug';
import { isPresent, isEmpty } from '@ember/utils';
import unwrapProxy from './utils/unwrap-proxy.ts';
import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

type IOptions = {
  presence: boolean;
  ignoreBlank?: boolean;
};

/**
 *  @class Presence
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.presence If true validates that the given value is not empty,
 *                                   if false, validates that the given value is empty.
 * @param {Boolean} options.ignoreBlank If true, treats an empty or whitespace string as not present
 * @param {Object} model
 * @param {String} attribute
 */
export default function validatePresence(
  value: unknown,
  options: IOptions,
  model: object,
  attribute: string,
): true | IValidationError<unknown, IOptions> {
  const { presence, ignoreBlank } = options;
  const v = unwrapProxy(value);
  const _isPresent = ignoreBlank ? isPresent(v) : !isEmpty(v);

  assert(
    `[validator:presence] [${attribute}] option 'presence' is required`,
    isPresent(presence),
  );

  if (presence === true && !_isPresent) {
    return validationError('blank', value, options);
  }

  if (presence === false && _isPresent) {
    return validationError('present', value, options);
  }

  return true;
}
