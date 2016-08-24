/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import { default as validate, regularExpressions } from 'ember-validators/format';
import context from '../../helpers/validator-context';

let options, message;

module('Unit | Validator | format');

test('no options', function(assert) {
  assert.expect(1);

  try {
    message = validate(undefined, {}, undefined, undefined, context);
  } catch (e) {
    assert.ok(true);
  }
});

test('allow blank', function(assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    type: 'email',
    regex: regularExpressions.email
  };
  options = context.cloneOptions(options);

  message = validate(undefined, options, undefined, undefined, context);
  assert.equal(message, true);

  message = validate('email', options, undefined, undefined, context);
  assert.equal(message, 'This field must be a valid email address');
});

test('email', function(assert) {
  const validAddresses = [
    'email@domain.com',
    'firstname.lastname@domain.com',
    'email@subdomain.domain.com',
    'firstname+lastname@domain.com',
    '1234567890@domain.com',
    'email@domain-one.com',
    '_______@domain.com',
    'email@domain.name',
    'email@domain.co.jp',
    'firstname-lastname@domain.com',
    'EMAIL@DOMAIN.COM'
  ];
  const invalidAddresses = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@domain.com',
    'Joe Smith <email@domain.com>',
    'email.domain.com',
    'email@domain@domain.com',
    '.email@domain.com',
    'email.@domain.com',
    'email..email@domain.com',
    'あいうえお@domain.com',
    'email@domain.com (Joe Smith)',
    'email@domain',
    'email@-domain.com',
    'email@domain..com'
  ];

  assert.expect(validAddresses.length + invalidAddresses.length);

  options = {
    type: 'email',
    regex: regularExpressions.email
  };

  options = context.cloneOptions(options);

  validAddresses.forEach((email) => assert.equal(validate(email, options, undefined, undefined, context), true, `validation of ${email} must succeed`));
  invalidAddresses.forEach((email) => assert.equal(validate(email, options, undefined, undefined, context), 'This field must be a valid email address', `validation of ${email} must fail`));
});

test('phone', function(assert) {
  assert.expect(2);

  options = {
    type: 'phone',
    regex: regularExpressions.phone
  };

  options = context.cloneOptions(options);

  message = validate('123', options, undefined, undefined, context);
  assert.equal(message, 'This field must be a valid phone number');

  message = validate('(408) 555-1234', options, undefined, undefined, context);
  assert.equal(message, true);
});

test('url', function(assert) {
  assert.expect(2);

  options = {
    type: 'url',
    regex: regularExpressions.url
  };

  options = context.cloneOptions(options);

  message = validate('yahoo', options, undefined, undefined, context);
  assert.equal(message, 'This field must be a valid url');

  message = validate('http://ww, undefined, undefined, contextw.yahoo.com', options, undefined, undefined, context);
  assert.equal(message, true);
});

test('custom', function(assert) {
  assert.expect(2);

  options = {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/
  };

  options = context.cloneOptions(options);

  message = validate('password', options, undefined, undefined, context);
  assert.equal(message, 'This field is invalid');

  message = validate('Pass123', options, undefined, undefined, context);
  assert.equal(message, true);
});
