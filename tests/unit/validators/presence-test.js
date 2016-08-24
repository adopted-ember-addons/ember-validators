/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/presence';
import context from '../../helpers/validator-context';

let options, message;

module('Unit | Validator | presence');

test('presence - value present', function(assert) {
  assert.expect(1);

  options = { presence: true };


  message = validate('value', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('presence - value blank', function(assert) {
  assert.expect(1);

  options = { presence: true };


  message = validate(' ', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('presence with ignoreBlank - value blank', function(assert) {
  assert.expect(1);

  options = { presence: true, ignoreBlank: true };


  message = validate(' ', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field can't be blank");
});

test('presence - value not present', function(assert) {
  assert.expect(1);

  options = { presence: true };

  message = validate(undefined, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field can't be blank");
});

test('absence - value present', function(assert) {
  assert.expect(1);

  options = { presence: false };

  message = validate('value', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field must be blank");
});

test('absence - value not present', function(assert) {
  assert.expect(1);

  options = { presence: false };

  message = validate(undefined, context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});
