/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';
import validate from 'ember-validators/ds-error';
import processResult from '../../helpers/process-result';

let model, result;

module('Unit | Validator | ds-error');

test('works with empty object', function(assert) {
  assert.expect(1);

  model = Ember.Object.create();

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), true);
});

test('it works', function(assert) {
  assert.expect(2);

  model = Ember.Object.create({
    errors: DS.Errors.create(),
    username: null
  });

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), true);

  model.get('errors').add('username', 'Username is not unique');

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), 'Username is not unique');
});

test('gets last message', function(assert) {
  assert.expect(2);

  model = Ember.Object.create({
    errors: DS.Errors.create(),
    username: null
  });

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), true);

  model.get('errors').add('username', 'Username is not unique');
  model.get('errors').add('username', 'Username is too long');

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), 'Username is too long');
});
