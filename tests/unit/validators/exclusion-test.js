/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/exclusion';
import context from '../../helpers/validator-context';

let options, message;

module('Unit | Validator | exclusion');

test('no options', function(assert) {
  assert.expect(1);

  try {
    message = validate(undefined, {}, undefined, undefined, context);
  } catch (e) {
    assert.ok(true);
  }
});

test('allow blank', function(assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    "in": ["foo", "bar", "baz"]
  };

  message = validate('', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('foo', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is reserved');
});

test('not in array', function(assert) {
  assert.expect(4);

  options = {
    "in": ["foo", "bar", "baz"]
  };

  message = validate('foo', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is reserved');

  message = validate('bar', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is reserved');

  message = validate('baz', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is reserved');

  message = validate('test', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('not in range', function(assert) {
  assert.expect(5);

  options = {
    range: [1, 10]
  };

  message = validate(1, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate(5, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate(10, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate(0, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(100, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('range type check - number', function(assert) {
  assert.expect(4);

  options = {
    range: [1, 10]
  };

  message = validate(1, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate(5, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate('1', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('5', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('range type check - string', function(assert) {
  assert.expect(4);

  options = {
    range: ['a', 'z']
  };

  message = validate('a', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate('z', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field is reserved");

  message = validate(97, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('zzz', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});
