import { module, test } from 'qunit';
import messages from 'ember-validators/messages';

module('Unit | Validator | messages');

test('message strings present', function(assert) {
  assert.expect(2);
  assert.equal(messages.invalid, '{description} is invalid');
  assert.equal(messages.tooShort, '{description} is too short (minimum is {min} characters)');
});

test('formatMessage', function(assert) {
  assert.expect(3);
  let context = {
    description: 'This field'
  };
  assert.equal(messages.formatMessage(undefined, context), 'This field is invalid');
  assert.equal(messages.formatMessage('{foo} is undefined'), 'undefined is undefined');
  assert.equal(messages.formatMessage('{foo} {foo} {bar} {baz}', { foo: 'a', bar: 1, baz: 'abc' }), 'a a 1 abc');
});

test('formatPartialMessage', function(assert) {
  assert.expect(3);
  let context = {
    description: 'This field'
  };
  assert.equal(messages.formatPartialMessage(undefined, context), 'This field is invalid');
  assert.equal(messages.formatPartialMessage('{foo} is undefined'), '{foo} is undefined');
  assert.equal(messages.formatPartialMessage('{foo} {foo} {bar} {baz}', { foo: 'a', bar: 1 }), 'a a 1 {baz}');
});

test('getMessageFor', function(assert) {
  assert.expect(2);
  let context = {
    description: 'This field',
    min: 4
  };
  assert.equal(messages.getMessageFor('foo', context), 'This field is invalid');
  assert.equal(messages.getMessageFor('tooShort', context), 'This field is too short (minimum is 4 characters)');
});
