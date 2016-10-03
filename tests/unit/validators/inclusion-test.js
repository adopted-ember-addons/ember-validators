/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/inclusion';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | inclusion');

test('no options', function(assert) {
  assert.expect(1);

  try {
    result = validate(undefined, {});
  } catch (e) {
    assert.ok(true);
  }
});

test('allow blank', function(assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    'in': ['foo', 'bar', 'baz']
  };

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');
});

test('in array', function(assert) {
  assert.expect(4);

  options = {
    'in': ['foo', 'bar', 'baz']
  };

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate('foo', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('bar', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('baz', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('in range', function(assert) {
  assert.expect(5);

  options = {
    range: [1, 10]
  };

  result = validate(0, cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate(100, cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate(1, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(5, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(10, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('range type check - number', function(assert) {
  assert.expect(7);

  options = {
    range: [1, 10]
  };

  result = validate('0', cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate(0, cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate('1', cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate('5', cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate(1, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(5, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(10, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('range type check - string', function(assert) {
  assert.expect(5);

  options = {
    range: ['a', 'z']
  };

  result = validate(97, cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate('zzz', cloneOptions(options));
  assert.equal(processResult(result), 'This field is not included in the list');

  result = validate('a', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('o', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('z', cloneOptions(options));
  assert.equal(processResult(result), true);
});
