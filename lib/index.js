'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.views = undefined;
exports.default = roneo;

require('turbolinks');

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

var _viewloader = require('viewloader');

var _viewloader2 = _interopRequireDefault(_viewloader);

var _views = require('./views');

var _views2 = _interopRequireDefault(_views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeNavOpenClasses() {
  // Remove any `.nav-aware` classes when widescreen
  var navAwareEls = Array.prototype.slice.call(document.querySelectorAll('.nav-aware'));
  navAwareEls.map(function (el) {
    el.classList.remove('nav-open');
  });
}

// Components
function roneo(views) {
  // Allow passing of specific views
  views = views || _views2.default;

  var viewloaderManager = (0, _viewloader2.default)(views);

  (0, _domready2.default)(function onDomready() {
    viewloaderManager.callViews();
  });
  // DOMContentLoaded equivalent with Turbolinks
  document.addEventListener('turbolinks:render', function onTurboLinksLoad() {
    viewloaderManager.callViews();
    var pageEl = document.querySelector('.page');
    pageEl.classList.remove('page--inactive');
  });

  // Destroy views when navigating
  document.addEventListener('turbolinks:before-render', function () {
    viewloaderManager.destroyViews();
  });

  // Hide nav when navigating
  document.addEventListener('turbolinks:request-start', function () {
    setTimeout(removeNavOpenClasses, 50);
    var pageEl = document.querySelector('.page');
    pageEl.classList.add('page--inactive');
  });

  /**
   * Make adjustments based on metaQuery breakpoints
   * Assumes that metaQuery is an object on window (because it should be inlined)
   */
  if (window.metaQuery) {
    window.metaQuery.onBreakpointChange('widescreen', function onBreakpointChangeWidescreen(matches) {
      if (matches) {
        removeNavOpenClasses();
      }
    });
  }
}

// Additional exports
exports.views = _views2.default;