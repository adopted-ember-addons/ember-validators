/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import validate from 'ember-validators/presence';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | presence');

test('presence - value present', function(assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate('value', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('presence - value blank', function(assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate(' ', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('presence with ignoreBlank - value blank', function(assert) {
  assert.expect(1);

  options = { presence: true, ignoreBlank: true };

  result = validate(' ', cloneOptions(options));
  assert.equal(processResult(result), 'This field can\'t be blank');
});

test('presence - value not present', function(assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), 'This field can\'t be blank');
});

test('absence - value present', function(assert) {
  assert.expect(1);

  options = { presence: false };

  result = validate('value', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be blank');
});

test('absence - value not present', function(assert) {
  assert.expect(1);

  options = { presence: false };

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), true);
});
