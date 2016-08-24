/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/number';
import context from '../../helpers/validator-context';

let options, message;

module('Unit | Validator | number');

test('no options', function(assert) {
  assert.expect(2);

  message = validate(undefined, {}, undefined, undefined, context);
  assert.equal(message, 'This field must be a number');

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('allow string', function(assert) {
  assert.expect(6);

  options = {
    allowString: true
  };

  message = validate('22', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('22.22', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('test', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be a number');

  message = validate('', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be a number');

  options.allowString = false;

  message = validate('22', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be a number');

  message = validate('22.22', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be a number');


});

test('integer', function(assert) {
  assert.expect(3);

  options = {
    integer: true
  };

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(22.22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be an integer');

  message = validate(-2.2, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be an integer');
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 22
  };

  message = validate(1, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be equal to 22');

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('lt', function(assert) {
  assert.expect(3);

  options = {
    lt: 22
  };

  message = validate(21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be less than 22');

  message = validate(23, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be less than 22');
});

test('lte', function(assert) {
  assert.expect(3);

  options = {
    lte: 22
  };

  message = validate(21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(23, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be less than or equal to 22');
});

test('gt', function(assert) {
  assert.expect(3);

  options = {
    gt: 22
  };

  message = validate(21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be greater than 22');

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be greater than 22');

  message = validate(23, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('gte', function(assert) {
  assert.expect(3);

  options = {
    gte: 22
  };

  message = validate(21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be greater than or equal to 22');

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(23, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('positive', function(assert) {
  assert.expect(4);

  options = {
    positive: true
  };

  message = validate(-1, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be positive');

  message = validate(-144, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be positive');

  message = validate(0, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('odd', function(assert) {
  assert.expect(4);

  options = {
    odd: true
  };

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be odd');

  message = validate(-144, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be odd');

  message = validate(21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(-21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('even', function(assert) {
  assert.expect(5);

  options = {
    even: true
  };

  message = validate(22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(-22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(22.22, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be even');

  message = validate(21, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be even');

  message = validate(-33, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be even');
});

test('allowBlank', function(assert) {
  assert.expect(3);

  options = {
    allowBlank: true
  };

  message = validate(null, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate(undefined, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});
