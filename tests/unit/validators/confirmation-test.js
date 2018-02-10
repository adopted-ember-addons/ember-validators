import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import validate from 'ember-validators/confirmation';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let model, options, result;

module('Unit | Validator | confirmation');

test('attribute', function(assert) {
  assert.expect(2);

  options = { on: 'email' };

  model = EmberObject.create({
    'email': 'foo@gmail.com'
  });

  result = validate('bar@gmail.com', cloneOptions(options), model);
  assert.equal(processResult(result), 'This field doesn\'t match email');

  model.set('emailConfirmation', 'foo@gmail.com');

  result = validate('foo@gmail.com', cloneOptions(options), model);
  assert.equal(processResult(result), true);
});

test('allowBlank', function(assert) {
  assert.expect(1);

  options = { on: 'email', allowBlank: true };

  result = validate('', cloneOptions(options), model);
  assert.equal(processResult(result), true);
});
