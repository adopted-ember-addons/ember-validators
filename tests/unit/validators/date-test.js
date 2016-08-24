/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import moment from 'moment';
import { module, test } from 'qunit';
import validate from 'ember-validators/date';
import context from '../../helpers/validator-context';

let  options, message;

module('Unit | Validator | date');

test('no options', function(assert) {
  assert.expect(1);

  options = {};
  message = validate(undefined, options, undefined, undefined, context);
  assert.equal(message, true);
});

test('allow blank', function(assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    before: '1/1/2015'
  };

  message = validate('', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('1/1/2016', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be before Jan 1st, 2015');
});

test('valid date', function(assert) {
  assert.expect(2);

  options = {};

  message = validate('abc', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be a valid date');

  message = validate(new Date(), context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('valid input date format', function(assert) {
  assert.expect(2);

  options = {
    format: 'DD/M/YYYY'
  };

  message = validate('27/3/15', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be in the format of DD/M/YYYY');

  message = validate('27/3/2015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('error date format', function(assert) {
  assert.expect(1);

  options = {
    errorFormat: 'M/D/YYYY',
    before: '1/1/2015'
  };

  message = validate('1/1/2016', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be before 1/1/2015');
});

test('before', function(assert) {
  assert.expect(2);

  options = {
    before: '1/1/2015'
  };

  message = validate('1/1/2016', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be before Jan 1st, 2015');

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('before now', function(assert) {
  assert.expect(2);
  var now = moment().format('MMM Do, YYYY');
  options = {
    before: 'now'
  };

  message = validate('1/1/3015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, `This field must be before ${now}`);

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('before or on', function(assert) {
  assert.expect(3);

  options = {
    onOrBefore: '1/1/2015'
  };

  message = validate('1/1/2016', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be on or before Jan 1st, 2015');

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('1/1/2015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('before now or on', function(assert) {
  assert.expect(3);
  var now = moment().format('MMM Do, YYYY');
  options = {
    onOrBefore: 'now'
  };

  message = validate('1/1/3015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, `This field must be on or before ${now}`);

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('now', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('before or on precision', function(assert) {
  var precisions = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  assert.expect((precisions.length * 3) -1);
  var now = moment(new Date('2013-02-08T09:30:26'));
  var dateString = now.toString();
  var nowMessage = now.format('MMM Do, YYYY');

  for (var i = 0; i < precisions.length; i++) {
    var precision = precisions[i];

    options = { onOrBefore: dateString };

    message = validate(now, context.cloneOptions(options), undefined, undefined, context);
    assert.equal(message, true);

    message = validate(moment(now).add(1, precision), context.cloneOptions(options), undefined, undefined, context);
    assert.equal(message, `This field must be on or before ${nowMessage}`);

    if ((i + 1) !== precisions.length) {
      options = { onOrBefore: dateString, precision: precisions[i + 1] };

      message = validate(moment(now).add(1, precisions), context.cloneOptions(options), undefined, undefined, context);
      assert.equal(message, true);
    }
  }
});

test('after', function(assert) {
  assert.expect(2);

  options = {
    after: '1/1/2015'
  };

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be after Jan 1st, 2015');

  message = validate('1/1/2016', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('after now', function(assert) {
  assert.expect(2);
  var now = moment().format('MMM Do, YYYY');
  options = {
    after: 'now'
  };

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, `This field must be after ${now}`);

  message = validate('1/1/3015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('after or on', function(assert) {
  assert.expect(3);

  options = {
    onOrAfter: '1/1/2015'
  };

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, 'This field must be on or after Jan 1st, 2015');

  message = validate('1/1/2016', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('1/1/2015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('after now or on', function(assert) {
  assert.expect(3);
  var now = moment().format('MMM Do, YYYY');
  options = {
    onOrAfter: 'now',
    precision: 'second'
  };

  message = validate('1/1/2014', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, `This field must be on or after ${now}`);

  message = validate('1/1/3015', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);

  message = validate('now', context.cloneOptions(options), undefined, undefined, context);
  assert.equal(message, true);
});

test('after or on precision', function(assert) {
  var precisions = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  assert.expect((precisions.length * 3) -1);
  var now = moment(new Date('2013-02-08T09:30:26'));
  var dateString = now.toString();
  var nowMessage = now.format('MMM Do, YYYY');

  for (var i = 0; i < precisions.length; i++) {
    var precision = precisions[i];

    options = { onOrAfter: dateString };

    message = validate(now, context.cloneOptions(options), undefined, undefined, context);
    assert.equal(message, true);

    message = validate(moment(now).subtract(1, precision), context.cloneOptions(options), undefined, undefined, context);
    assert.equal(message, `This field must be on or after ${nowMessage}`);

    if ((i + 1) !== precisions.length) {
      options = { onOrAfter: dateString, precision: precisions[i + 1] };

      message = validate(moment(now).subtract(1, precisions), context.cloneOptions(options), undefined, undefined, context);
      assert.equal(message, true);
    }
  }
});
