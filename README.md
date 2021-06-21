# Ember Validators

[![Build Status](https://travis-ci.org/offirgolan/ember-validators.svg)](https://travis-ci.org/offirgolan/ember-validators)
[![npm version](https://badge.fury.io/js/ember-validators.svg)](http://badge.fury.io/js/ember-validators)

A collection of EmberJS validators


```shell
ember install ember-validators
```

## Helpful Links

- ### [Documentation](https://offirgolan.github.io/ember-validators)
- ### [Changelog](CHANGELOG.md)

## Looking for help?

If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-validators/issues).

## Usage

Validators can be individually imported and used as such

```js
import validatePresence from 'ember-validators/presence';
import validateLength from 'ember-validators/length';

validatePresence('foo', { presence: true });
validateLength('foo', { min: 1 });
```

or via the **validate** method provided

```js
import { validate } from 'ember-validators';

validate('presence', 'foo', { presence: true });
validate('length', 'foo', { min: 1 });
```

## Validator Method Signature

Each validator has the following signature:

```js
function (value, options, model, attribute) {}
```

#### Parameters:

- value (**Mixed**):

  The value to validate

- options (**Object**):

  A mutable object that holds validation specific options

- model (**Object**):

  The model that is being validated

- attribute (**String**):

  The attribute that is being validated

#### Returns:

- **Boolean**

  `true` will be returned if the validation passed

- **Object**

  Validation failed and a message should be built with the given attributes

  - type (**String**):

    The message type

  - value (**Mixed**):

    The value that was validated

  - context (**Object**):

    The error message context

  - message (**String**):

    The error message. If this is specified, use this string as the error message instead of building one.
