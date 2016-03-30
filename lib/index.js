'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = roneo;

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

var _viewloader = require('viewloader');

var _viewloader2 = _interopRequireDefault(_viewloader);

var _views = require('./views');

var _views2 = _interopRequireDefault(_views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function roneo() {
  // Kick off
  (0, _domready2.default)(function onDomReady() {
    _viewloader2.default.execute(_views2.default);
  });

  /**
   * Make adjustments based on metaQuery breakpoints
   * Assumes that metaQuery is an object on window (because it should be inlined)
   */
  if (window.metaQuery) {
    window.metaQuery.onBreakpointChange('widescreen', function onBreakpointChangeWidescreen(matches) {
      if (matches) {
        // Remove any `.nav-open` classes when widescreen
        var navOpenElements = Array.prototype.slice.call(document.querySelectorAll('.nav-open'));
        navOpenElements.map(function (el) {
          el.classList.remove('nav-open');
        });
      }
    });
  }
}

// Components