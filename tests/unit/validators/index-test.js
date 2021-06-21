import { module, test } from 'qunit';
import { validate } from 'ember-validators';

module('Unit | Validator | index');

test('validate presence via general validate method', function (assert) {
  let result = validate('presence', 'a', { presence: true });
  assert.equal(result, true);
});

test('validate date via general validate method', function (assert) {
  let result = validate('date', 'now', {});
  assert.equal(result, true);
});
