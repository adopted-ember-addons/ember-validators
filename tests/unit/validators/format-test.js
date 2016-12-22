/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { module, test } from 'qunit';
import { default as validate, regularExpressions } from 'ember-validators/format';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

function testEmailAddresses(assert, options, valid = [], invalid = []) {
  options = cloneOptions(options);
  valid.forEach((email) => assert.equal(processResult(validate(email, options)), true, `validation of ${email} must succeed`));
  invalid.forEach((email) => assert.equal(processResult(validate(email, options)), 'This field must be a valid email address', `validation of ${email} must fail`));
}

module('Unit | Validator | format');

test('no options', function(assert) {
  assert.expect(1);

  try {
    result = validate(undefined, {});
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
  options = cloneOptions(options);

  result = validate(undefined, options);
  assert.equal(processResult(result), true);

  result = validate('email', options);
  assert.equal(processResult(result), 'This field must be a valid email address');
});

test('email', function(assert) {
  let validAddresses = [
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
  let invalidAddresses = [
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
    'email@domain.',
    'email@domain.-',
    'email@domain-',
    'email@domain-.',
    'email@domain.com.',
    'email@domain.com.-',
    'email@domain.com-',
    'email@domain.com-.',
    'email@-domain.com',
    'email@domain..com'
  ];

  assert.expect(validAddresses.length + invalidAddresses.length);

  options = {
    type: 'email',
    regex: regularExpressions.email
  };

  testEmailAddresses(assert, options, validAddresses, invalidAddresses);
});

test('email + allowNonTld', function(assert) {
  let validAddresses = [
    'email@domain.com',
    'email@domain'
  ];

  assert.expect(validAddresses.length);

  options = {
    type: 'email',
    regex: regularExpressions.email,
    allowNonTld: true
  };

  testEmailAddresses(assert, options, validAddresses);
});

test('email + minTldLength', function(assert) {
  let validAddresses = [
    'email@domain.com',
    'email@domain.co',
    'email@domain.co.nz',
    'email@domain.c.nz'
  ];

  let invalidAddresses = [
    'email@domain.c',
    'email@domain.c.i'
  ];

  assert.expect(validAddresses.length + invalidAddresses.length);

  options = {
    type: 'email',
    regex: regularExpressions.email,
    minTldLength: 2
  };

  testEmailAddresses(assert, options, validAddresses, invalidAddresses);
});

test('phone', function(assert) {
  assert.expect(2);

  options = {
    type: 'phone',
    regex: regularExpressions.phone
  };

  options = cloneOptions(options);

  result = validate('123', options);
  assert.equal(processResult(result), 'This field must be a valid phone number');

  result = validate('(408) 555-1234', options);
  assert.equal(processResult(result), true);
});

test('url', function(assert) {
  assert.expect(2);

  options = {
    type: 'url',
    regex: regularExpressions.url
  };

  options = cloneOptions(options);

  result = validate('yahoo', options);
  assert.equal(processResult(result), 'This field must be a valid url');

  result = validate('http://www.yahoo.com', options);
  assert.equal(processResult(result), true);
});

test('custom', function(assert) {
  assert.expect(3);

  options = {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/
  };

  options = cloneOptions(options);

  result = validate(null, options);
  assert.equal(processResult(result), 'This field is invalid');

  result = validate('password', options);
  assert.equal(processResult(result), 'This field is invalid');

  result = validate('Pass123', options);
  assert.equal(processResult(result), true);
});

test('custom with g flag', function(assert) {
  assert.expect(3);

  options = {
    regex: /foo/g
  };

  options = cloneOptions(options);

  result = validate('foo', options);
  assert.equal(processResult(result), true);

  result = validate('foo', options);
  assert.equal(processResult(result), true);

  result = validate('bar', options);
  assert.equal(processResult(result), 'This field is invalid');
});
