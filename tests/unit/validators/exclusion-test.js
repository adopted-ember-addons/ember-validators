import { module, test } from 'qunit';
import validate from 'ember-validators/exclusion';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | exclusion');

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
    'in': ['foo', 'bar', 'baz']
  };

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('foo', cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');
});

test('not in array', function(assert) {
  assert.expect(4);

  options = {
    'in': ['foo', 'bar', 'baz']
  };

  result = validate('foo', cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate('bar', cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate('baz', cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate('test', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('not in range', function(assert) {
  assert.expect(5);

  options = {
    range: [1, 10]
  };

  result = validate(1, cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate(5, cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate(10, cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate(0, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(100, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('range type check - number', function(assert) {
  assert.expect(4);

  options = {
    range: [1, 10]
  };

  result = validate(1, cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate(5, cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate('1', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('5', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('range type check - string', function(assert) {
  assert.expect(4);

  options = {
    range: ['a', 'z']
  };

  result = validate('a', cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate('z', cloneOptions(options));
  assert.equal(processResult(result), 'This field is reserved');

  result = validate(97, cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('zzz', cloneOptions(options));
  assert.equal(processResult(result), true);
});
