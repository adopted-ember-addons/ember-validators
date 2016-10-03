/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const {
  canInvoke
} = Ember;

export default function isPromise(p) {
  return !!(p && canInvoke(p, 'then'));
}
