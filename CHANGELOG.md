# Changelog

## v4.0.0
- [[Major]: Remove Moment and Node 10](https://github.com/offirgolan/ember-validators/pull/100);
    - removed String 'now' argument.  
    - remove moments
    - Remove `precision` argument.  If you need to compare based on precision, you can use the Intl.DateTimeFormat [APIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options) to hone in on the comparison - `{ year: 'numeric' }` 

## v3.0.0
    - Remove node v4

## v2.0.0

### Pull Requests

- [#67](https://github.com/offirgolan/ember-validators/pull/67) Bump ember-require-module dependency _by [Andrey Fel](https://github.com/andreyfel)_

## v1.2.3

### Commits

- [d761cb0](https://github.com/offirgolan/ember-validators/commit/d761cb029da53c89ba8faa08f9710367b5135139) Revert Bump ember-require-module dependency _by [Offir Golan](https://github.com/offirgolan)_

## v1.2.2

### Pull Requests

- [#67](https://github.com/offirgolan/ember-validators/pull/67) Bump ember-require-module dependency _by [Andrey Fel](https://github.com/andreyfel)_

## v1.2.1

### Commits

- [ef5e5cc](https://github.com/offirgolan/ember-validators/commit/ef5e5cc4cebdbed58cf48073d2c12557716bbaa5) **date**: fix(date): Show correct error message when a date is invalid with a custom format _by [Offir Golan](https://github.com/offirgolan)_

## v1.2.0

### Pull Requests

- [#64](https://github.com/offirgolan/ember-validators/pull/64) **number**: docfix for positive option _by [Blake Gentry](https://github.com/bgentry)_
- [#63](https://github.com/offirgolan/ember-validators/pull/63) **number**: fix behavior of allowNone _by [Blake Gentry](https://github.com/bgentry)_

## v1.1.1

### Pull Requests

- [#61](https://github.com/offirgolan/ember-validators/pull/61) Revert license back to yahoo BSD-3 _by [Offir Golan](https://github.com/offirgolan)_
- [#62](https://github.com/offirgolan/ember-validators/pull/62) Move moment assertion to inside validate method _by [Offir Golan](https://github.com/offirgolan)_

## v1.1.0

### Pull Requests

- [#60](https://github.com/offirgolan/ember-validators/pull/60) Update all the things _by [Offir Golan](https://github.com/offirgolan)_

## v1.0.4

### Pull Requests

- [#57](https://github.com/offirgolan/ember-validators/pull/57) Update `ember-cli-babel` to v6.9.2 _by [Tobias Bieniek](https://github.com/Turbo87)_

## v1.0.3

### Pull Requests

- [#54](https://github.com/offirgolan/ember-validators/pull/54) Update minimum version of ember-require-module _by [Jonathan Johnson](https://github.com/jrjohnson)_

## v1.0.2

### Pull Requests

- [#52](https://github.com/offirgolan/ember-validators/pull/52) Use consistent semver of ember-require-module _by [Lei Zhao](https://github.com/leizhao4)_

## v1.0.1

### Pull Requests

- [#48](https://github.com/offirgolan/ember-validators/pull/48) [BUGFIX] Remove assert in length validator _by [Offir Golan](https://github.com/offirgolan)_

## v1.0.0

### Pull Requests

- [#45](https://github.com/offirgolan/ember-validators/pull/45) [FEATURE] Support Ember Changeset Validations _by [Offir Golan](https://github.com/offirgolan)_

## v0.2.0

### Pull Requests

- [#40](https://github.com/offirgolan/ember-validators/pull/40) Remove unnecessary module caching _by [Offir Golan](https://github.com/offirgolan)_
- [#39](https://github.com/offirgolan/ember-validators/pull/39) [FEATURE] allowNonTld & minTldLength in format validator _by [Offir Golan](https://github.com/offirgolan)_
- [#42](https://github.com/offirgolan/ember-validators/pull/42) Expose parseDate function in the date validator _by [Guillaume Gérard](https://github.com/GreatWizard)_
- [#41](https://github.com/offirgolan/ember-validators/pull/41) [BUGFIX] Use String.match instead of RegExp.test to support g flag _by [Offir Golan](https://github.com/offirgolan)_

## v0.1.2

- Use ember-require-module

## v0.1.1

- Add Validator documentation

## v0.1.0

- Initial release
