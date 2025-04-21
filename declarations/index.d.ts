import type { IValidationError } from './utils/validation-error.ts';
type DateTimeFormatOptions = Parameters<typeof Intl.DateTimeFormat>[1];
type IValidator = (value: unknown, options: Record<string, boolean | number | string | Date | DateTimeFormatOptions>, _model: object, attribute: string) => true | IValidationError<unknown, object>;
type KnownValidator = 'collection' | 'confirmation' | 'date' | 'ds-error' | 'exclusion' | 'format' | 'inclusion' | 'length' | 'messages' | 'number' | 'presence';
export declare function validate(type: KnownValidator, ...args: Parameters<IValidator>): true | IValidationError<unknown, object>;
export {};
