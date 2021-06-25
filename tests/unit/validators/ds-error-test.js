import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import validate from 'ember-validators/ds-error';
import processResult from '../../helpers/process-result';

let model, result;

class DSErrors extends Map {
  errorsFor(key) {
    let errors = [];
    for (let [k, val] of this.entries()) {
      if (k === key) {
        errors.push({ message: val })
      }
    }

    return errors;
  }
}

module('Unit | Validator | ds-error');

test('works with empty object', function (assert) {
  assert.expect(1);

  model = EmberObject.create();

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), true);
});

test('it works', function (assert) {
  assert.expect(2);

  model = EmberObject.create({
    errors: new DSErrors(),
    username: null,
  });

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), true);

  model.get('errors').set('username', 'Username is not unique');

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), 'Username is not unique');
});

test('gets last message', function (assert) {
  assert.expect(2);

  model = EmberObject.create({
    errors: new DSErrors(),
    username: null,
  });

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), true);

  model.get('errors').set('username', 'Username is not unique');
  model.get('errors').set('username', 'Username is too long');

  result = validate(undefined, undefined, model, 'username');
  assert.equal(processResult(result), 'Username is too long');
});
