'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inlineFooter;

var _fontsLoaded = require('../fonts-loaded');

var _fontsLoaded2 = _interopRequireDefault(_fontsLoaded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fontsToCheck = [{
  family: 'Work Sans',
  style: 'normal',
  weight: '400'
}, {
  family: 'Work Sans',
  style: 'italic',
  weight: '400'
}, {
  family: 'Work Sans',
  style: 'normal',
  weight: '600'
}, {
  family: 'Work Sans',
  style: 'italic',
  weight: '600'
}, {
  family: 'Inconsolata',
  style: 'normal',
  weight: '400'
}, {
  family: 'Inconsolata',
  style: 'italic',
  weight: '400'
}];

/**
 * Intended to be inlined and injected in to the footer (end) of the page
 */
function inlineFooter() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var fonts = options.fonts;

  if (fonts) {
    fontsToCheck.concat(fonts);
  }
  (0, _fontsLoaded2.default)(fontsToCheck);
}