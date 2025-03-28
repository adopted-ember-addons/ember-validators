import { get } from '@ember/object';
import validationError, {
  type IValidationError,
} from './utils/validation-error.ts';

interface IOptions {
  path: string;
  key: boolean;
}

/**
 *  @class DS Error
 *  @module Validators
 */

/**
 * @method validate
 * @param {Any} value
 * @param {Object} options
 * @param {Object} model
 * @param {String} attribute
 */
export default function validateDsError(
  value: unknown,
  options: IOptions,
  model: object,
  attribute: string,
): true | IValidationError<unknown, IOptions> {
  const { path, key } = getPathAndKey(attribute);

  const errors = get(model, path) as
    | undefined
    | {
        has: (key: string) => unknown;
        errorsFor: (
          key: string,
        ) => Array<{ attribute: string; message: string }>;
      };

  if (errors && errors.has && errors.has(key)) {
    const errorsFor = errors.errorsFor(key);
    return validationError(
      'ds',
      null,
      options,
      errorsFor.length ? errorsFor[errorsFor.length - 1]!.message : [],
    );
  }

  return true;
}

export function getPathAndKey(attribute: string): {
  path: string;
  key: string;
} {
  const path = attribute.split('.');
  const key = path.pop()!;

  path.push('errors');

  return { path: path.join('.'), key };
}
