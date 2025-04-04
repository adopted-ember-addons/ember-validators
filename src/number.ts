import { isEmpty, isNone } from '@ember/utils';
import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

type IOptions = {
  allowBlank?: boolean;
  allowNone?: boolean;
  allowString?: boolean;
  integer?: boolean;
  positive?: boolean;
  odd?: boolean;
  even?: boolean;
  is?: number;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  multipleOf?: number;
};

/**
 *  @class Number
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Boolean} options.allowBlank If true, skips validation if the value is empty
 * @param {Boolean} options.allowNone If true, skips validation if the value is null or undefined. __Default: true__
 * @param {Boolean} options.allowString If true, validator will accept string representation of a number
 * @param {Boolean} options.integer Number must be an integer
 * @param {Boolean} options.positive Number must be greater than or equal to 0
 * @param {Boolean} options.odd Number must be odd
 * @param {Boolean} options.even Number must be even
 * @param {Number} options.is Number must be equal to this value
 * @param {Number} options.lt Number must be less than this value
 * @param {Number} options.lte Number must be less than or equal to this value
 * @param {Number} options.gt Number must be greater than this value
 * @param {Number} options.gte Number must be greater than or equal to this value
 * @param {Number} options.multipleOf Number must be a multiple of this value
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateNumber(
  value: string | number,
  options: IOptions,
): true | IValidationError<string | number, IOptions> {
  const numValue = Number(value);
  const optionKeys = Object.keys(options) as Array<keyof IOptions>;
  const { allowBlank, allowNone = true, allowString, integer } = options;

  if (allowNone && isNone(value)) {
    return true;
  }

  if (allowBlank && isEmpty(value)) {
    return true;
  }

  if (isEmpty(value)) {
    return validationError('notANumber', value, options);
  }

  if (typeof value === 'string' && !allowString) {
    return validationError('notANumber', value, options);
  }

  if (!isNumber(numValue)) {
    return validationError('notANumber', value, options);
  }

  if (integer && !isInteger(numValue)) {
    return validationError('notAnInteger', value, options);
  }

  for (const type of optionKeys) {
    const returnValue = _validateType(type, options, numValue);

    if (typeof returnValue !== 'boolean') {
      return returnValue;
    }
  }

  return true;
}

function _validateType(
  type: keyof IOptions,
  options: IOptions,
  value: string | number,
): true | IValidationError<string | number, IOptions> {
  const expected = options[type];
  const actual = value;

  if (type === 'is' && actual !== expected) {
    return validationError('equalTo', value, options);
  } else if (type === 'lt' && actual >= expected!) {
    return validationError('lessThan', value, options);
  } else if (type === 'lte' && actual > expected!) {
    return validationError('lessThanOrEqualTo', value, options);
  } else if (type === 'gt' && actual <= expected!) {
    return validationError('greaterThan', value, options);
  } else if (type === 'gte' && actual < expected!) {
    return validationError('greaterThanOrEqualTo', value, options);
  } else if (type === 'positive' && (actual as number) < 0) {
    return validationError('positive', value, options);
  } else if (
    type === 'odd' &&
    (!isInteger(actual) || (actual as number) % 2 === 0)
  ) {
    return validationError('odd', value, options);
  } else if (
    type === 'even' &&
    (!isInteger(actual) || (actual as number) % 2 !== 0)
  ) {
    return validationError('even', value, options);
  } else if (
    type === 'multipleOf' &&
    !isInteger((actual as number) / (expected as number))
  ) {
    return validationError('multipleOf', value, options);
  }

  return true;
}

/*
  Use polyfills instead of Number.isNaN or Number.isInteger to support IE & Safari
 */

function isNumber(value: string | number): boolean {
  return typeof value === 'number' && !isNaN(value);
}

function isInteger(value: string | number): boolean {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  );
}
