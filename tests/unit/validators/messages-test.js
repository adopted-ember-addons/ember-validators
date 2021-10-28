import { module, test } from 'qunit';
import messages from 'ember-validators/messages';

module('Unit | Validator | messages');

test('message strings present', function (assert) {
  assert.expect(2);
  assert.strictEqual(messages.invalid, '{description} is invalid');
  assert.strictEqual(
    messages.tooShort,
    '{description} is too short (minimum is {min} characters)'
  );
});

test('formatMessage', function (assert) {
  assert.expect(3);
  let context = {
    description: 'This field',
  };
  assert.strictEqual(
    messages.formatMessage(undefined, context),
    'This field is invalid'
  );
  assert.strictEqual(
    messages.formatMessage('{foo} is undefined'),
    'undefined is undefined'
  );
  assert.strictEqual(
    messages.formatMessage('{foo} {foo} {bar} {baz}', {
      foo: 'a',
      bar: 1,
      baz: 'abc',
    }),
    'a a 1 abc'
  );
});

test('getMessageFor', function (assert) {
  assert.expect(2);
  let context = {
    description: 'This field',
    min: 4,
  };
  assert.strictEqual(
    messages.getMessageFor('foo', context),
    'This field is invalid'
  );
  assert.strictEqual(
    messages.getMessageFor('tooShort', context),
    'This field is too short (minimum is 4 characters)'
  );
});
