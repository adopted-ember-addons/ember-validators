import { Promise } from 'rsvp';
import { module, test } from 'qunit';
import isPromise from 'ember-validators/utils/is-promise';

module('Unit | Util | isPromise');

test('correctly detects promise', function (assert) {
  assert.ok(isPromise(new Promise((resolve) => resolve())));
  assert.ok(isPromise(Promise.resolve()));
  assert.notOk(isPromise({}));
  assert.notOk(isPromise(null));
});
