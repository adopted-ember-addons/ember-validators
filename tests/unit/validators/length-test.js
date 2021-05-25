import { module, test } from 'qunit';
import validate from 'ember-validators/length';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | length');

test('no options', function(assert) {
  assert.expect(1);

  result = validate(undefined, {});
  assert.ok(true);
});

test('allow blank', function(assert) {
  assert.expect(4);

  options = {
    allowBlank: true,
    min: 5
  };

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(' ', cloneOptions(options));
  assert.equal(processResult(result), 'This field is too short (minimum is 5 characters)');

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), 'This field is too short (minimum is 5 characters)');
});

test('allow none', function(assert) {
  assert.expect(3);

  options = {
    allowNone: true
  };

  result = validate(undefined, cloneOptions(options));
  assert.equal(processResult(result), true);

  options.allowNone = false;

  result = validate(null, cloneOptions(options));
  assert.equal(processResult(result), 'This field is invalid');

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('is', function(assert) {
  assert.expect(2);

  options = {
    is: 4
  };

  result = validate('testing', cloneOptions(options));
  assert.equal(processResult(result), 'This field is the wrong length (should be 4 characters)');

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('min', function(assert) {
  assert.expect(2);

  options = {
    min: 5
  };

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), 'This field is too short (minimum is 5 characters)');

  result = validate('testing', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('max', function(assert) {
  assert.expect(2);

  options = {
    max: 5
  };

  result = validate('testing', cloneOptions(options));
  assert.equal(processResult(result), 'This field is too long (maximum is 5 characters)');

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('between', function(assert) {
  assert.expect(3);

  options = {
    min: 1,
    max: 5,
    useBetweenMessage: true
  };

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be between 1 and 5 characters');

  result = validate('123456', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be between 1 and 5 characters');

  result = validate('1234', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('array', function(assert) {
  assert.expect(2);

  options = {
    min: 1
  };

  result = validate([], cloneOptions(options));
  assert.equal(processResult(result), 'This field is too short (minimum is 1 characters)');

  result = validate([1], cloneOptions(options));
  assert.equal(processResult(result), true);
});
