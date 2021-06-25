import { module, test } from 'qunit';
import validate from 'ember-validators/date';
import processResult from '../../helpers/process-result';
import cloneOptions from '../../helpers/clone-options';

let options, result;

module('Unit | Validator | date');

test('no options', function (assert) {
  assert.expect(1);

  options = {};
  result = validate(undefined, options);
  assert.equal(processResult(result), true);
});

test('allow blank', function (assert) {
  assert.expect(2);

  options = {
    allowBlank: true,
    before: new Date('1/1/2015'),
  };

  result = validate('', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(
    processResult(result),
    'This field must be before January 1, 2015'
  );
});

test('valid date', function (assert) {
  assert.expect(2);

  options = {};

  result = validate('abc', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a valid date');

  result = validate(new Date(), cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('valid input date format', function (assert) {
  assert.expect(3);

  options = {
    format: { year: 'numeric', month: 'numeric', day: '2-digit' }
  };

  result = validate('27/3/15', cloneOptions(options));
  assert.equal(
    processResult(result),
    'This field must be in the format of DD/M/YYYY'
  );

  result = validate('30/2/2015', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be a valid date');

  result = validate('27/3/2015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('error date format', function (assert) {
  assert.expect(1);

  options = {
    errorFormat: 'M/D/YYYY',
    before: new Date('1/1/2015'),
  };

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be before 1/1/2015');
});

test('before', function (assert) {
  assert.expect(2);

  options = {
    before: new Date('1/1/2015'),
  };

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(
    processResult(result),
    'This field must be before January 1, 2015'
  );

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before now', function (assert) {
  assert.expect(2);
  options = {
    before: new Date(),
  };

  let now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date('1/1/3015'));
  result = validate(now, cloneOptions(options));
  assert.equal(processResult(result), `This field must be before ${now}`);

  now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date('1/1/2014'));
  result = validate(now, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before or on', function (assert) {
  assert.expect(3);

  let now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date('1/1/2016'));
  options = {
    onOrBefore: new Date('1/1/2015'),
  };

  result = validate(now, cloneOptions(options));
  assert.equal(
    processResult(result),
    'This field must be on or before January 1, 2015'
  );

  now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date('1/1/2014'));
  result = validate(now, cloneOptions(options));
  assert.equal(processResult(result), true);

  now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date('1/1/2015'));
  result = validate(now, cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before now or on', function (assert) {
  assert.expect(3);
  let now = new Date();
  options = {
    onOrBefore: new Date(),
  };

  result = validate(new Date('1/1/3015'), cloneOptions(options));
  assert.equal(processResult(result), `This field must be on or before ${now}`);

  result = validate(new Date('1/1/2014'), cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate(new Date(), cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('before or on precision', function (assert) {
  let precisions = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  assert.expect(precisions.length * 3 - 1);
  let now = new Date('2/8/2013');
  let dateString = now.toString();
  let nowMessage = now;

  for (let i = 0; i < precisions.length; i++) {
    let precision = precisions[i];

    options = { onOrBefore: dateString };

    result = validate(now, cloneOptions(options));
    assert.equal(processResult(result), true);

    let date = addOne(now, precision);
    result = validate(date, cloneOptions(options));
    assert.equal(
      processResult(result),
      `This field must be on or before ${nowMessage}`
    );

    if (i + 1 !== precisions.length) {
      options = { onOrBefore: dateString, precision: precisions[i + 1] };

      let date = addOne(now, precision);
      result = validate(date, cloneOptions(options));
      assert.equal(processResult(result), true);
    }
  }
});

test('after', function (assert) {
  assert.expect(2);

  options = {
    after: new Date('1/1/2015'),
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), 'This field must be after January 1, 2015');

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after now', function (assert) {
  assert.expect(2);
  let now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format();
  options = {
    after: new Date(),
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), `This field must be after ${now}`);

  result = validate('1/1/3015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after or on', function (assert) {
  assert.expect(3);

  options = {
    onOrAfter: new Date('1/1/2015'),
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(
    processResult(result),
    'This field must be on or after January 1, 2015'
  );

  result = validate('1/1/2016', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('1/1/2015', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after now or on', function (assert) {
  assert.expect(3);
  let now = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format();
  options = {
    onOrAfter: new Date(),
    precision: 'second',
  };

  result = validate('1/1/2014', cloneOptions(options));
  assert.equal(processResult(result), `This field must be on or after ${now}`);

  result = validate('1/1/3015', cloneOptions(options));
  assert.equal(processResult(result), true);

  result = validate('now', cloneOptions(options));
  assert.equal(processResult(result), true);
});

test('after or on precision', function (assert) {
  let precisions = ['second', 'minute', 'hour', 'day', 'month', 'year'];

  assert.expect(precisions.length * 3 - 1);
  let now = new Date('2013-02-08T09:30:26');
  let dateString = now.toString();
  let nowMessage = '';

  for (let i = 0; i < precisions.length; i++) {
    let precision = precisions[i];

    options = { onOrAfter: dateString };

    result = validate(now, cloneOptions(options));
    assert.equal(processResult(result), true);

    let date = subOne(now, precision);
    result = validate(
      date,
      cloneOptions(options)
    );
    assert.equal(
      processResult(result),
      `This field must be on or after ${nowMessage}`
    );

    if (i + 1 !== precisions.length) {
      options = { onOrAfter: dateString, precision: precisions[i + 1] };

      let date = subOne(now, precision);
      result = validate(
        date,
        cloneOptions(options)
      );
      assert.equal(processResult(result), true);
    }
  }
});

function subOne(d, precision) {
  switch (precision) {
    case 'second':
      d.setSeconds(d.getSeconds() - 1);
      return d;
    case 'minute':
      d.setMinutes(d.setMinutes() - 1);
      return d;
    case 'hour':
      d.setHours(d.setHours() - 1);
      return d;
    case 'day':
      d.setDate(d.getDate() - 1);
      return d;
    case 'month':
      d.setMonth(d.getMonth() - 1);
      return d;
    case 'year':
      d.setFullYear(d.getFullYear() - 1);
      return d;
  }
}

function addOne(d, precision) {
  switch (precision) {
    case 'second':
      d.setSeconds(d.getSeconds() - 1);
      return d;
    case 'minute':
      d.setMinutes(d.setMinutes() - 1);
      return d;
    case 'hour':
      d.setHours(d.setHours() - 1);
      return d;
    case 'day':
      d.setDate(d.getDate() - 1);
      return d;
    case 'month':
      d.setMonth(d.getMonth() - 1);
      return d;
    case 'year':
      d.setFullYear(d.getFullYear() - 1);
      return d;
  }
}
