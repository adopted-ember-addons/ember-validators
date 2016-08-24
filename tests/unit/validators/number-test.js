/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/number';
import context from '../../helpers/validator-context';
import cloneOptions from '../../helpers/clone-options';

let options, message;

module('Unit | Validator | number');

test('no options', function(assert) {
  assert.expect(2);

  message = validate(context, undefined, {});
  assert.equal(message, 'This field must be a number');

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);
});

test('allow string', function(assert) {
  assert.expect(6);

  options = {
    allowString: true
  };

  message = validate(context, '22', cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, '22.22', cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 'test', cloneOptions(options));
  assert.equal(message, 'This field must be a number');

  message = validate(context, '', cloneOptions(options));
  assert.equal(message, 'This field must be a number');

  options.allowString = false;

  message = validate(context, '22', cloneOptions(options));
  assert.equal(message, 'This field must be a number');

  message = validate(context, '22.22', cloneOptions(options));
  assert.equal(message, 'This field must be a number');


});

test('integer', function(assert) {
  assert.expect(3);

  options = {
    integer: true
  };

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 22.22, cloneOptions(options));
  assert.equal(message, 'This field must be an integer');

  message = validate(context, -2.2, cloneOptions(options));
  assert.equal(message, 'This field must be an integer');
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 22
  };

  message = validate(context, 1, cloneOptions(options));
  assert.equal(message, 'This field must be equal to 22');

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);
});

test('lt', function(assert) {
  assert.expect(3);

  options = {
    lt: 22
  };

  message = validate(context, 21, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, 'This field must be less than 22');

  message = validate(context, 23, cloneOptions(options));
  assert.equal(message, 'This field must be less than 22');
});

test('lte', function(assert) {
  assert.expect(3);

  options = {
    lte: 22
  };

  message = validate(context, 21, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 23, cloneOptions(options));
  assert.equal(message, 'This field must be less than or equal to 22');
});

test('gt', function(assert) {
  assert.expect(3);

  options = {
    gt: 22
  };

  message = validate(context, 21, cloneOptions(options));
  assert.equal(message, 'This field must be greater than 22');

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, 'This field must be greater than 22');

  message = validate(context, 23, cloneOptions(options));
  assert.equal(message, true);
});

test('gte', function(assert) {
  assert.expect(3);

  options = {
    gte: 22
  };

  message = validate(context, 21, cloneOptions(options));
  assert.equal(message, 'This field must be greater than or equal to 22');

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 23, cloneOptions(options));
  assert.equal(message, true);
});

test('positive', function(assert) {
  assert.expect(4);

  options = {
    positive: true
  };

  message = validate(context, -1, cloneOptions(options));
  assert.equal(message, 'This field must be positive');

  message = validate(context, -144, cloneOptions(options));
  assert.equal(message, 'This field must be positive');

  message = validate(context, 0, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);
});

test('odd', function(assert) {
  assert.expect(4);

  options = {
    odd: true
  };

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, 'This field must be odd');

  message = validate(context, -144, cloneOptions(options));
  assert.equal(message, 'This field must be odd');

  message = validate(context, 21, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, -21, cloneOptions(options));
  assert.equal(message, true);
});

test('even', function(assert) {
  assert.expect(5);

  options = {
    even: true
  };

  message = validate(context, 22, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, -22, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, 22.22, cloneOptions(options));
  assert.equal(message, 'This field must be even');

  message = validate(context, 21, cloneOptions(options));
  assert.equal(message, 'This field must be even');

  message = validate(context, -33, cloneOptions(options));
  assert.equal(message, 'This field must be even');
});

test('allowBlank', function(assert) {
  assert.expect(3);

  options = {
    allowBlank: true
  };

  message = validate(context, null, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, undefined, cloneOptions(options));
  assert.equal(message, true);

  message = validate(context, '', cloneOptions(options));
  assert.equal(message, true);
});
