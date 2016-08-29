/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import { validate } from 'ember-validators';
import validatorsCache from 'ember-validators/-private/validators-cache';

module('Unit | Validator | index');

test('validator cache works', function(assert) {
  assert.notOk(validatorsCache.presence);
  let result = validate('presence', 'a', { presence: true });
  assert.equal(result, true);
  assert.ok(validatorsCache.presence);
});

test('validator cache is persistant', function(assert) {
  assert.ok(validatorsCache.presence);
  let result = validate('length', 'a', { min: 1 });
  assert.equal(result, true);
  assert.ok(validatorsCache.length);
});

test('validate presence via general validate method', function(assert) {
  let result = validate('presence', 'a', { presence: true });
  assert.equal(result, true);
});

test('validate date via general validate method', function(assert) {
  let result = validate('date', 'now', { });
  assert.equal(result, true);
});
