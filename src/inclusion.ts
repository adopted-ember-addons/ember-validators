import { assert } from '@ember/debug';
import { isEmpty, typeOf } from '@ember/utils';
import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

type IOptions = {
  allowBlank?: boolean;
  in: unknown[];
  range: [min: number, max: number];
};

/**
 *  @class Inclusion
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Array} options.in The list of values this attribute could be
 * @param {Array} options.range The range in which the attribute's value should reside in
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateInclusion(
  value: unknown,
  options: IOptions,
  model: object,
  attribute: string,
): true | IValidationError<unknown, IOptions> {
  const array = options.in;
  const { range, allowBlank } = options;

  assert(
    `[validator:inclusion] [${attribute}] no options were passed in`,
    !isEmpty(Object.keys(options)),
  );

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (array && array.indexOf(value) === -1) {
    return validationError('inclusion', value, options);
  }

  if (range && range.length === 2) {
    const [min, max] = range;
    const equalType =
      typeOf(value) === typeOf(min) && typeOf(value) === typeOf(max);
    const isInvalidNumber =
      typeOf(value) === 'number' && isNaN(value as number);

    if (
      !equalType ||
      isInvalidNumber ||
      min > (value as number) ||
      (value as number) > max
    ) {
      return validationError('inclusion', value, options);
    }
  }

  return true;
}
