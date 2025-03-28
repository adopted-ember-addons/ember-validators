import { module, test } from 'qunit';
import validate from 'ember-validators/number';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | number');

test('no options', function (assert) {
  assert.expect(3);

  result = validate(undefined, {});
  assert.true(processResult(result));

  result = validate('', {});
  assert.strictEqual(processResult(result), 'This field must be a number');

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));
});

test('allow string', function (assert) {
  assert.expect(6);

  options = {
    allowString: true,
  };

  result = validate('22', cloneOptions(options));
  assert.true(processResult(result));

  result = validate('22.22', cloneOptions(options));
  assert.true(processResult(result));

  result = validate('test', cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be a number');

  result = validate('', cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be a number');

  options.allowString = false;

  result = validate('22', cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be a number');

  result = validate('22.22', cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be a number');
});

test('integer', function (assert) {
  assert.expect(3);

  options = {
    integer: true,
  };

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(22.22, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be an integer');

  result = validate(-2.2, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be an integer');
});

test('is', function (assert) {
  assert.expect(2);

  options = {
    is: 22,
  };

  result = validate(1, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be equal to 22');

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));
});

test('lt', function (assert) {
  assert.expect(3);

  options = {
    lt: 22,
  };

  result = validate(21, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(22, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be less than 22');

  result = validate(23, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be less than 22');
});

test('lte', function (assert) {
  assert.expect(3);

  options = {
    lte: 22,
  };

  result = validate(21, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(23, cloneOptions(options));
  assert.strictEqual(
    processResult(result),
    'This field must be less than or equal to 22',
  );
});

test('gt', function (assert) {
  assert.expect(3);

  options = {
    gt: 22,
  };

  result = validate(21, cloneOptions(options));
  assert.strictEqual(
    processResult(result),
    'This field must be greater than 22',
  );

  result = validate(22, cloneOptions(options));
  assert.strictEqual(
    processResult(result),
    'This field must be greater than 22',
  );

  result = validate(23, cloneOptions(options));
  assert.true(processResult(result));
});

test('multipleOf', function (assert) {
  assert.expect(4);

  options = {
    multipleOf: 2,
  };

  result = validate(5, cloneOptions(options));
  assert.strictEqual(
    processResult(result),
    'This field must be a multiple of 2',
  );

  result = validate(17, cloneOptions(options));
  assert.strictEqual(
    processResult(result),
    'This field must be a multiple of 2',
  );

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(0, cloneOptions(options));
  assert.true(processResult(result));
});

test('gte', function (assert) {
  assert.expect(3);

  options = {
    gte: 22,
  };

  result = validate(21, cloneOptions(options));
  assert.strictEqual(
    processResult(result),
    'This field must be greater than or equal to 22',
  );

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(23, cloneOptions(options));
  assert.true(processResult(result));
});

test('positive', function (assert) {
  assert.expect(4);

  options = {
    positive: true,
  };

  result = validate(-1, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be positive');

  result = validate(-144, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be positive');

  result = validate(0, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));
});

test('odd', function (assert) {
  assert.expect(6);

  options = {
    odd: true,
  };

  result = validate(22, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be odd');

  result = validate(-144, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be odd');

  result = validate(21.21, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be odd');

  result = validate(0, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be odd');

  result = validate(21, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(-21, cloneOptions(options));
  assert.true(processResult(result));
});

test('even', function (assert) {
  assert.expect(6);

  options = {
    even: true,
  };

  result = validate(22, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(-22, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(0, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(22.22, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be even');

  result = validate(21, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be even');

  result = validate(-33, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be even');
});

test('allowBlank', function (assert) {
  assert.expect(3);

  options = {
    allowBlank: true,
  };

  result = validate(null, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(undefined, cloneOptions(options));
  assert.true(processResult(result));

  result = validate('', cloneOptions(options));
  assert.true(processResult(result));
});

test('allowNone', function (assert) {
  assert.expect(4);

  options = {
    allowNone: true,
  };

  result = validate(null, cloneOptions(options));
  assert.true(processResult(result));

  result = validate(undefined, cloneOptions(options));
  assert.true(processResult(result));

  options.allowNone = false;

  result = validate(null, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be a number');

  result = validate(undefined, cloneOptions(options));
  assert.strictEqual(processResult(result), 'This field must be a number');
});
