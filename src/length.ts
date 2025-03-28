import { isEmpty, isNone } from '@ember/utils';
import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

type IOptions = {
  allowBlank?: boolean;
  allowNone?: boolean;
  useBetweenMessage?: boolean;
  is?: number;
  min?: number;
  max?: number;
};

/**
 *  @class Length
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowNone If true, skips validation if the value is null or undefined. __Default: true__
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Boolean} options.useBetweenMessage If true, uses the between error message when `max` and `min` are both set
 * @param {Number} options.is The exact length the value can be
 * @param {Number} options.min The minimum length the value can be
 * @param {Number} options.max The maximum length the value can be
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateLength(
  value: string,
  options: IOptions,
): true | IValidationError<string, IOptions> {
  const {
    allowNone = true,
    allowBlank,
    useBetweenMessage,
    is,
    min,
    max,
  } = options;

  if (isNone(value)) {
    return allowNone ? true : validationError('invalid', value, options);
  }

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  const length = value.length;

  if (!isNone(is) && is !== length) {
    return validationError('wrongLength', value, options);
  }

  if (
    useBetweenMessage &&
    !isNone(min) &&
    !isNone(max) &&
    (length < min || length > max)
  ) {
    return validationError('between', value, options);
  }

  if (!isNone(min) && min > length) {
    return validationError('tooShort', value, options);
  }

  if (!isNone(max) && max < length) {
    return validationError('tooLong', value, options);
  }

  return true;
}
