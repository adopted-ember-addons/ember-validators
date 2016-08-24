/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';
import validate from 'ember-validators/ds-error';
import context from '../../helpers/validator-context';

let model, message;

module('Unit | Validator | ds-error');

test('works with empty object', function(assert) {
  assert.expect(1);

  model = Ember.Object.create();

  message = validate(undefined, undefined, model, 'username', context);
  assert.equal(message, true);
});

test('it works', function(assert) {
  assert.expect(2);

  model = Ember.Object.create({
    errors: DS.Errors.create(),
    username: null
  });

  message = validate(undefined, undefined, model, 'username', context);
  assert.equal(message, true);

  model.get('errors').add('username', 'Username is not unique');

  message = validate(undefined, undefined, model, 'username', context);
  assert.equal(message, 'Username is not unique');
});

test('gets last message', function(assert) {
  assert.expect(2);

  model = Ember.Object.create({
    errors: DS.Errors.create(),
    username: null
  });

  message = validate(undefined, undefined, model, 'username', context);
  assert.equal(message, true);

  model.get('errors').add('username', 'Username is not unique');
  model.get('errors').add('username', 'Username is too long');

  message = validate(undefined, undefined, model, 'username', context);
  assert.equal(message, 'Username is too long');
});
