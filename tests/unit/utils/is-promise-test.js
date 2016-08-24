/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { module, test } from 'qunit';
import isPromise from 'ember-validators/utils/is-promise';

const {
  RSVP: { Promise }
} = Ember;

module('Unit | Util | isPromise');

test('correctly detects promise', function(assert) {
  assert.ok(isPromise(new Promise(resolve => resolve())));
  assert.ok(isPromise(Promise.resolve()));
  assert.notOk(isPromise({}));
  assert.notOk(isPromise(null));
});
