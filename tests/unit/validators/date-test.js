/**
 * Copyright 2016, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import moment from 'moment';
import { module, test } from 'qunit';
import validate from 'ember-validators/date';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let  options, result;

module('Unit | Validator | date');

test('no options', function(assert) {
  assert.expect(1);

  options = {};
  result = validate(undefined, options);
  assert.equal(processResult(result), true);
});

test('allow blank', function(assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    before: '1/1/2015'
  };

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be before Jan 1st, 2015');
});

test('valid date', function(assert) {
  assert.expect(2);

  options = {};

  result = validate('abc', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a valid date');

  result = validate(new Date(), cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('valid input date format', function(assert) {
  assert.expect(2);

  options = {
    format: 'DD/M/YYYY'
  };

  result = validate('27/3/15', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be in the format of DD/M/YYYY');

  result = validate('27/3/2015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('error date format', function(assert) {
  assert.expect(1);

  options = {
    errorFormat: 'M/D/YYYY',
    before: '1/1/2015'
  };

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be before 1/1/2015');
});

test('before', function(assert) {
  assert.expect(2);

  options = {
    before: '1/1/2015'
  };

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be before Jan 1st, 2015');

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before now', function(assert) {
  assert.expect(2);
  let now = moment().format('MMM Do, YYYY');
  options = {
    before: 'now'
  };

  result = validate('1/1/3015', cloneOptions(options));
  assert.equal(processResult(result), `This field must be before ${now}`);

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before or on', function(assert) {
  assert.expect(3);

  options = {
    onOrBefore: '1/1/2015'
  };

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be on or before Jan 1st, 2015');

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('1/1/2015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before now or on', function(assert) {
  assert.expect(3);
  let now = moment().format('MMM Do, YYYY');
  options = {
    onOrBefore: 'now'
  };

  result = validate('1/1/3015', cloneOptions(options));
  assert.equal(processResult(result), `This field must be on or before ${now}`);

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('now', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before or on precision', function(assert) {
  let precisions = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  assert.expect((precisions.length * 3) - 1);
  let now = moment(new Date('2013-02-08T09:30:26'));
  let dateString = now.toString();
  let nowMessage = now.format('MMM Do, YYYY');

  for (let i = 0; i < precisions.length; i++) {
    let precision = precisions[i];

    options = { onOrBefore: dateString };

    result = validate(now, cloneOptions(options));
    assert.equal(processResult(result), true);

    result = validate(moment(now).add(1, precision), cloneOptions(options));
    assert.equal(processResult(result), `This field must be on or before ${nowMessage}`);

    if ((i + 1) !== precisions.length) {
      options = { onOrBefore: dateString, precision: precisions[i + 1] };

      result = validate(moment(now).add(1, precisions), cloneOptions(options));
      assert.equal(processResult(result), true);
    }
  }
});

test('after', function(assert) {
  assert.expect(2);

  options = {
    after: '1/1/2015'
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be after Jan 1st, 2015');

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after now', function(assert) {
  assert.expect(2);
  let now = moment().format('MMM Do, YYYY');
  options = {
    after: 'now'
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), `This field must be after ${now}`);

  result = validate('1/1/3015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after or on', function(assert) {
  assert.expect(3);

  options = {
    onOrAfter: '1/1/2015'
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be on or after Jan 1st, 2015');

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('1/1/2015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after now or on', function(assert) {
  assert.expect(3);
  let now = moment().format('MMM Do, YYYY');
  options = {
    onOrAfter: 'now',
    precision: 'second'
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), `This field must be on or after ${now}`);

  result = validate('1/1/3015', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('now', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after or on precision', function(assert) {
  let precisions = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  assert.expect((precisions.length * 3) - 1);
  let now = moment(new Date('2013-02-08T09:30:26'));
  let dateString = now.toString();
  let nowMessage = now.format('MMM Do, YYYY');

  for (let i = 0; i < precisions.length; i++) {
    let precision = precisions[i];

    options = { onOrAfter: dateString };

    result = validate(now, cloneOptions(options));
    assert.equal(processResult(result), true);

    result = validate(moment(now).subtract(1, precision), cloneOptions(options));
    assert.equal(processResult(result), `This field must be on or after ${nowMessage}`);

    if ((i + 1) !== precisions.length) {
      options = { onOrAfter: dateString, precision: precisions[i + 1] };

      result = validate(moment(now).subtract(1, precisions), cloneOptions(options));
      assert.equal(processResult(result), true);
    }
  }
});
