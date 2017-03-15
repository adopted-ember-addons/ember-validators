/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

export default function validationError(type, value, context, message) {
  return { type, value, context, message };
}
