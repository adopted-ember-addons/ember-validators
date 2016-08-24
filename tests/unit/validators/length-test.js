/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/length';
import context from '../../helpers/validator-context';
import cloneOptions from '../../helpers/clone-options';

let options, message;

module('Unit | Validator | length');

test('no options', function(assert) {
  assert.expect(1);

  try {
    message = validate(context, undefined, {});
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

  message = validate(context, '', cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 'test', cloneOptions(options));
  assert.equal(message, 'This field is too short (minimum is 5 characters)');
});

test('allow none', function(assert) {
  assert.expect(2);

  options = {
    allowNone: true
  };

  message = validate(context, undefined, cloneOptions(options));
  assert.equal(message, true);

  options.allowNone = false;
  message = validate(context, null, cloneOptions(options));
  assert.equal(message, 'This field is invalid');
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 4
  };

  message = validate(context, 'testing', cloneOptions(options));
  assert.equal(message, 'This field is the wrong length (should be 4 characters)');

  message = validate(context, 'test', cloneOptions(options));
  assert.equal(message, true);
});

test('min', function(assert) {
  assert.expect(2);

  options = {
    min: 5
  };

  message = validate(context, 'test', cloneOptions(options));
  assert.equal(message, 'This field is too short (minimum is 5 characters)');

  message = validate(context, 'testing', cloneOptions(options));
  assert.equal(message, true);
});

test('max', function(assert) {
  assert.expect(2);

  options = {
    max: 5
  };

  message = validate(context, 'testing', cloneOptions(options));
  assert.equal(message, 'This field is too long (maximum is 5 characters)');

  message = validate(context, 'test', cloneOptions(options));
  assert.equal(message, true);
});

test('array', function(assert) {
  assert.expect(2);

  options = {
    min: 1
  };

  message = validate(context, [], cloneOptions(options));
  assert.equal(message, 'This field is too short (minimum is 1 characters)');

  message = validate(context, [1], cloneOptions(options));
  assert.equal(message, true);
});
