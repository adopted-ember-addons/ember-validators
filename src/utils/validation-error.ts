export default function validationError<V, C>(
  type: IValidationError<V, C>['type'],
  value: V,
  context: C,
  message?: string | string[],
): IValidationError<V, C> {
  return { type, value, context, message };
}

export interface IValidationError<V, C> {
  type:
    | 'collection'
    | 'confirmation'
    | 'date'
    | 'ds'
    | 'ds-error'
    | 'exclusion'
    | 'format'
    | 'inclusion'
    | 'length'
    | 'messages'
    | 'number'
    | 'presence'
    | 'singular'
    | 'email'
    | 'phone'
    | 'url'
    | 'invalid'
    | 'wrongLength'
    | 'between'
    | 'tooShort'
    | 'tooLong'
    | 'notANumber'
    | 'notAnInteger'
    | 'equalTo'
    | 'lessThan'
    | 'lessThanOrEqualTo'
    | 'greaterThan'
    | 'greaterThanOrEqualTo'
    | 'positive'
    | 'odd'
    | 'even'
    | 'multipleOf'
    | 'blank'
    | 'present'
    | 'before'
    | 'onOrBefore'
    | 'after'
    | 'onOrAfter';
  value: V;
  context: C;
  message?: string | string[];
}
