/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import requireModule from 'ember-validators/utils/require-module';

module('Unit | Util | requireModule');

test('requires correct module', function(assert) {
  assert.expect(1);

  try {
    assert.ok(requireModule('ember-data'));
  } catch (e) {
    // Should never get here
    assert.ok(false);
  }
});

test('requiring incorrect module silently fails', function(assert) {
  assert.expect(1);

  try {
    assert.notOk(requireModule('some-fake-module'));
  } catch (e) {
    // Should never get here
    assert.ok(false);
  }
});
