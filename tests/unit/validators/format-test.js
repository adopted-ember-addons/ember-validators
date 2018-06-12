import { module, test } from 'qunit';
import validate from 'ember-validators/format';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

function testMultipleScenarios(assert, options, valid = [], invalid = []) {
  const typeLabelMap = {
    email: 'email address',
    url: 'url'
  }
  const label = typeLabelMap[options.type];
  options = cloneOptions(options);
  valid.forEach((testItem) => assert.equal(processResult(validate(testItem, options)), true, `validation of ${testItem} must succeed`));
  invalid.forEach((testItem) => assert.equal(processResult(validate(testItem, options)), `This field must be a valid ${label}`, `validation of ${testItem} must fail`));
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
    type: 'email'
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
    null,
    undefined,
    404,
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
    type: 'email'
  };

  testMultipleScenarios(assert, options, validAddresses, invalidAddresses);
});

test('email + allowNonTld', function(assert) {
  let validAddresses = [
    'email@domain.com',
    'email@domain'
  ];

  assert.expect(validAddresses.length);

  options = {
    type: 'email',
    allowNonTld: true
  };

  testMultipleScenarios(assert, options, validAddresses);
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
    minTldLength: 2
  };

  testMultipleScenarios(assert, options, validAddresses, invalidAddresses);
});

test('url + allowNonTld', function(assert) {
  let validUrls = [
    'http://google.com',
    'http://bburl',
    'http://bburl/jello',
    'http://bburl.com/really-good-jello'
  ];

  let invalidUrls = ['i am a bad url']

  assert.expect(validUrls.length + invalidUrls.length);

  options = {
    type: 'url',
    allowNonTld: true
  };

  testMultipleScenarios(assert, options, validUrls, invalidUrls);
});

test('phone', function(assert) {
  assert.expect(2);

  options = {
    type: 'phone'
  };

  options = cloneOptions(options);

  result = validate('123', options);
  assert.equal(processResult(result), 'This field must be a valid phone number');

  result = validate('(408) 555-1234', options);
  assert.equal(processResult(result), true);
});

test('url', function(assert) {
  assert.expect(3);

  options = {
    type: 'url'
  };

  testMultipleScenarios(assert, options, ['http://www.offirgolan.com'], ['offirgolan', 'http://bburl']);
});

test('inverse - with type', function(assert) {
  assert.expect(2);

  options = {
    type: 'email',
    inverse: true
  };

  options = cloneOptions(options);

  result = validate('email@domain.com', options);
  assert.equal(processResult(result), 'This field must be a valid email address');

  result = validate('foobar123', options);
  assert.equal(processResult(result), true);
});

test('inverse - custom', function(assert) {
  assert.expect(2);

  options = {
    inverse: true,
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/
  };

  options = cloneOptions(options);

  result = validate('Pass123', options);
  assert.equal(processResult(result), 'This field is invalid');

  result = validate('foobar', options);
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
