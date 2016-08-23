/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/* globals self */

export default function requireModule(module) {
  return self.requirejs.has(module) ? self.require(module).default : undefined;
}
