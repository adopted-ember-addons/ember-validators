/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/collection';
import context from '../../helpers/validator-context';

let options, message;

module('Unit | Validator | collection');

test('value is collection', function(assert) {
  assert.expect(1);

  options = { collection: true };

  message = validate(['foo', 'bar'], context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('value not collection', function(assert) {
  assert.expect(1);

  options = { collection: true };

  message = validate('foo', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field must be a collection");
});

test('singular - value is singular', function(assert) {
  assert.expect(1);

  options = { collection: false };

  message = validate('value', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('singular - value not singular', function(assert) {
  assert.expect(1);

  options = { collection: false };

  message = validate(['foo', 'bar'], context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, "This field can't be a collection");
});
