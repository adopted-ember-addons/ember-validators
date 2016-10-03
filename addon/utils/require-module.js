/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/* globals self */

export default function requireModule(module) {
  let rjs = self.requirejs;

  if (
    (rjs.has && rjs.has(module)) ||
    (!rjs.has && (rjs.entries[module] || rjs.entries[`${module}/index`]))
  ) {
    return self.require(module).default;
  }
}
