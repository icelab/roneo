'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inlineHeader;

var _fontsCached = require('../fonts-cached');

var _fontsCached2 = _interopRequireDefault(_fontsCached);

var _metaquery = require('metaquery');

var _metaquery2 = _interopRequireDefault(_metaquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.metaQuery = _metaquery2.default;

/**
 * Intended to be inlined and injected in to the <head> of the page
 */


/**
 * Expose metaQuery as a global on window
 */
function inlineHeader(options) {
  /**
   * Check if fonts are cached
   */
  (0, _fontsCached2.default)();

  /**
   * Load fonts from Google Fonts
   */
  window.WebFontConfig = {
    google: {
      families: ['Work+Sans:400,600:latin', 'Inconsolata::latin']
    }
  };
  // Allow additional Google Fonts families to be passed in
  if (options.families) {
    window.WebFontConfig.google.families.concat(options.families);
  }

  var webFontElement = document.createElement('script');
  webFontElement.src = (document.location.protocol === 'https:' ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  webFontElement.type = 'text/javascript';
  webFontElement.async = 'true';
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(webFontElement, first);
}