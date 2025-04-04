import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { importSync } from '@embroider/macros';
import type { IValidationError } from './utils/validation-error.ts';

type DateTimeFormatOptions = Parameters<typeof Intl.DateTimeFormat>[1];

type IValidator = (
  value: unknown,
  options: Record<
    string,
    boolean | number | string | Date | DateTimeFormatOptions
  >,
  _model: object,
  attribute: string,
) => true | IValidationError<unknown, object>;

type KnownValidator =
  | 'collection'
  | 'confirmation'
  | 'date'
  | 'ds-error'
  | 'exclusion'
  | 'format'
  | 'inclusion'
  | 'length'
  | 'messages'
  | 'number'
  | 'presence';

export function validate(
  type: KnownValidator,
  ...args: Parameters<IValidator>
): true | IValidationError<unknown, object> {
  let validator;

  if (type === 'collection') {
    validator = import_collection();
  } else if (type === 'confirmation') {
    validator = import_confirmation();
  } else if (type === 'date') {
    validator = import_date();
  } else if (type === 'ds-error') {
    validator = import_ds_error();
  } else if (type === 'exclusion') {
    validator = import_exclusion();
  } else if (type === 'format') {
    validator = import_format();
  } else if (type === 'inclusion') {
    validator = import_inclusion();
  } else if (type === 'length') {
    validator = import_length();
  } else if (type === 'messages') {
    validator = import_messages();
  } else if (type === 'number') {
    validator = import_number();
  } else if (type === 'presence') {
    validator = import_presence();
  }

  assert(`Validator not found of type: ${type}.`, isPresent(validator));

  return (validator as { default: IValidator }).default(...args);
}

function import_collection() {
  return importSync('./collection');
}

function import_confirmation() {
  return importSync('./confirmation');
}

function import_date() {
  return importSync('./date');
}

function import_ds_error() {
  return importSync('./ds-error');
}

function import_exclusion() {
  return importSync('./exclusion');
}

function import_format() {
  return importSync('./format');
}

function import_inclusion() {
  return importSync('./inclusion');
}

function import_length() {
  return importSync('./length');
}

function import_messages() {
  return importSync('./messages');
}

function import_number() {
  return importSync('./number');
}

function import_presence() {
  return importSync('./presence');
}
