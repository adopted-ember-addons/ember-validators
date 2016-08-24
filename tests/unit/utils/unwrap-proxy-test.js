/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { module, test } from 'qunit';
import { default as unwrapProxy, isProxy } from 'ember-validators/utils/unwrap-proxy';

module('Unit | Util | unwrapProxy');

test('unwraps proxy content', function(assert) {
  const objProxy = Ember.ObjectProxy.create({
    content: { foo: 'bar' }
  });

  const arrProxy = Ember.ArrayProxy.create({
    content: ['foo', 'bar']
  });

  const unwrappedObj = unwrapProxy(objProxy);
  const unwrappedArr = unwrapProxy(arrProxy);

  assert.notOk(isProxy(unwrappedObj));
  assert.deepEqual(unwrappedObj, { foo: 'bar' });

  assert.notOk(isProxy(unwrappedArr));
  assert.deepEqual(unwrappedArr, ['foo', 'bar']);
});

test('unwraps nested proxy content', function(assert) {
  const objProxy = Ember.ObjectProxy.create({
    content: Ember.ObjectProxy.create({
      content: { foo: 'bar' }
    })
  });

  const unwrappedObj = unwrapProxy(objProxy);

  assert.notOk(isProxy(unwrappedObj));
  assert.deepEqual(unwrappedObj, { foo: 'bar' });
});
