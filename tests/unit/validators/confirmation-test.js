/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import Ember from 'ember';
import { module, test } from 'qunit';
import validate from 'ember-validators/confirmation';
import context from '../../helpers/validator-context';

let model, options, message;

module('Unit | Validator | confirmation');

test('attribute', function(assert) {
  assert.expect(2);

  options = { on: 'email' };

  model = Ember.Object.create({
    'email': 'foo@yahoo.com'
  });

  message = validate('bar@yahoo.com', context.cloneOptions(options), model, undefined, context);
  assert.equal(message, "This field doesn't match email");

  model.set('emailConfirmation', 'foo@yahoo.com');

  message = validate('foo@yahoo.com', context.cloneOptions(options), model, undefined, context);
  assert.equal(message, true);
});
