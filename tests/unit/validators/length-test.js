/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/length';
import context from '../../helpers/validator-context';

let options, message;

module('Unit | Validator | length');

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
    min: 5
  };

  message = validate('', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('test', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is too short (minimum is 5 characters)');
});

test('allow none', function(assert) {
  assert.expect(2);

  options = {
    allowNone: true
  };

  message = validate(undefined, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  options.allowNone = false;
  message = validate(null, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is invalid');
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 4
  };

  message = validate('testing', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is the wrong length (should be 4 characters)');

  message = validate('test', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('min', function(assert) {
  assert.expect(2);

  options = {
    min: 5
  };

  message = validate('test', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is too short (minimum is 5 characters)');

  message = validate('testing', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('max', function(assert) {
  assert.expect(2);

  options = {
    max: 5
  };

  message = validate('testing', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is too long (maximum is 5 characters)');

  message = validate('test', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('array', function(assert) {
  assert.expect(2);

  options = {
    min: 1
  };

  message = validate([], context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field is too short (minimum is 1 characters)');

  message = validate([1], context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});
