import { module, test } from 'qunit';
import validate from 'ember-validators/presence';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | presence');

test('presence - value present', function (assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate('value', cloneOptions(options));
  assert.true(processResult(result));
});

test('presence - value empty', function (assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate('', cloneOptions(options));
  assert.strictEqual(processResult(result), "This field can't be blank");
});

test('presence with allowEmpty - value empty', function (assert) {
  assert.expect(1);

  options = { presence: true, allowEmpty: true };

  result = validate('', cloneOptions(options));
  assert.true(processResult(result));
});

test('presence - value blank', function (assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate(' ', cloneOptions(options));
  assert.true(processResult(result));
});

test('presence with ignoreBlank - value blank', function (assert) {
  assert.expect(1);

  options = { presence: true, ignoreBlank: true };

  result = validate(' ', cloneOptions(options));
  assert.strictEqual(processResult(result), "This field can't be blank");
});

test('presence - value not present', function (assert) {
  assert.expect(1);

  options = { presence: true };

  result = validate(undefined, cloneOptions(options));
  assert.strictEqual(processResult(result), "This field can't be blank");
});

test('absence - value present', function (assert) {
  assert.expect(1);

  options = { presence: false };

  result = validate('value', cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be blank');
});

test('absence - value not present', function (assert) {
  assert.expect(1);

  options = { presence: false };

  result = validate(undefined, cloneOptions(options));
  assert.true(processResult(result));
});
