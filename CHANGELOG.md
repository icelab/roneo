# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

# v3.1.1 2021-11-17

* Upgrade various dependencies to resolve security issues

# v3.1.0 2021-07-13

* [Remove metaQuery dependency](https://github.com/icelab/roneo/pull/20)

# v3.0.8 2019-01-08

* Fix CSS bug

# v3.0.7 2018-12-06

* Fix `navWidth` calculation

# v3.0.6 2018-11-27

* Upgrade `nodemon` to avoid `event-stream` and `flatmap-stream` security issue.

# v3.0.5 2018-10-16

* Expose `initializeFormalist` in place of `renderFormalist` so that events can
  be bound to the form instance before it’s rendered to the DOM

# v3.0.4 2018-10-11

* Update formalist-standard-react to version that include named-path support
* Expose `renderFormalist` method for easier modification in wrapping apps

# v3.0.3 2018-06-25

* Update formalist-standard-react version, require react >16.x and draft-js 0.10.5
* Update to use viewloader 2.x

# v2.0.3 2017-10-12

* Make @import compatible with with postcss-import library (all at top)

# v2.0.2 2017-09-28

* Use standalone prop-types package (has been removed from React)

# v2.0.1 2017-08-02

* Update formalist-standard-react version.

# v2.0.0 2017-08-02

* Update dependencies.

# v1.1.0 2017-03-12

* Add `form--busy` classes to `parentForm` for formalist forms when they’re busy.

# v1.0.2 2017-03-06

* Fix broken reference to `FontFaceObserver` import.

# v1.0.1 2017-02-24

* Drop draft-js dependency back to ^0.9.1. We’re waiting on compatibilty changes
  for the entity API in the importer/exporter to be released.

# v1.0.0 2017-02-23

* Releasing as v1.0.0 for better semver compatibility.

# v0.0.3 2017-01-26

* Update dependencies.

# v0.0.2 2017-01-26

* Fix references to `formalist-*` packages
* Make it so large tables can overflow properly on larger screens

# v0.0.1 2017-01-23

First release
