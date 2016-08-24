# Ember Validators

[![Build Status](https://travis-ci.org/offirgolan/ember-validators.svg)](https://travis-ci.org/offirgolan/ember-validators)
[![npm version](https://badge.fury.io/js/ember-validators.svg)](http://badge.fury.io/js/ember-validators)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-validators/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-validators)
[![Test Coverage](https://codeclimate.com/github/offirgolan/ember-validators/badges/coverage.svg)](https://codeclimate.com/github/offirgolan/ember-validators/coverage)
[![Dependency Status](https://david-dm.org/offirgolan/ember-validators.svg)](https://david-dm.org/offirgolan/ember-validators)
[![devDependency Status](https://david-dm.org/offirgolan/ember-validators/dev-status.svg)](https://david-dm.org/offirgolan/ember-validators#info=devDependencies)

A collection of EmberJS validators

## Installation

```shell
ember install ember-validators
```

## Helpful Links

- ### [Changelog](CHANGELOG.md)

## Looking for help?

If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-validators/issues).

## Usage

Each validator has the following signature:

```js
function (context, value, options, model, attribute) {}
```

#### Parameters:

- context (**Object**):

    Each validator must be passed a context. Please read below about what must be included in this object

- value (**Mixed**):

  The value to validate

- options (**Object**):

  A mutable object that holds validation specific options

- model (**Object**):

  The model that is being validated

- attribute (**String**):

  The attribute that is being validated

#### Returns:

- **true**

  Validation passed

- **String**

  Validation failed with the given error message

## Context

A context object must have the following method:

### createErrorMessage (type, value, context)

#### Parameters:

- type (**String**):

    The type of error message (i.e. *wrongLength*, *notANumber*, etc.)

- value (**Mixed**):

  The value that was validated

- context (**Object**):

  The error message context

  Given the following error message, the context should contain a **description**
  and **format** property.

  `{description} must be in the format of {format}`

#### Returns:

- **String**

  The final error message
