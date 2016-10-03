/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/collection';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | collection');

test('value is collection', function(assert) {
  assert.expect(1);

  options = { collection: true };

  result = validate(['foo', 'bar'], cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('value not collection', function(assert) {
  assert.expect(1);

  options = { collection: true };

  result = validate('foo', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a collection');
});

test('singular - value is singular', function(assert) {
  assert.expect(1);

  options = { collection: false };

  result = validate('value', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('singular - value not singular', function(assert) {
  assert.expect(1);

  options = { collection: false };

  result = validate(['foo', 'bar'], cloneOptions(options));
  assert.equal(processResult(result), 'This field can\'t be a collection');
});
