'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _confirmAction = require('../confirm-action');

var _confirmAction2 = _interopRequireDefault(_confirmAction);

var _confirmClick = require('../confirm-click');

var _confirmClick2 = _interopRequireDefault(_confirmClick);

var _disableInputZoom = require('../disable-input-zoom');

var _disableInputZoom2 = _interopRequireDefault(_disableInputZoom);

var _formalist = require('../formalist');

var _formalist2 = _interopRequireDefault(_formalist);

var _fastClick = require('../fast-click');

var _fastClick2 = _interopRequireDefault(_fastClick);

var _rowLink = require('../row-link');

var _rowLink2 = _interopRequireDefault(_rowLink);

var _toggleClass = require('../toggle-class');

var _toggleClass2 = _interopRequireDefault(_toggleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Singleton object we bind use to bind DOM elements to functions through
 * the viewloader library.
 *
 * snakeCase-named functions are matched to dasher-ize-d DOM nodes:
 *
 *   <div class="foo" data-view-foo-bar="hello">
 *   views.fooBar = function(el, props) {
 *     el.classList.has("foo") // true
 *     props === "hello" // true
 *   }
 *
 * @type {Object}
 */

exports.default = {
  confirmAction: _confirmAction2.default,
  confirmClick: _confirmClick2.default,
  disableInputZoom: _disableInputZoom2.default,
  fastClick: _fastClick2.default,
  formalist: _formalist2.default,
  rowLink: _rowLink2.default,
  toggleClass: _toggleClass2.default
};