'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inlineHeader;

var _fontsCached = require('../fonts-cached');

var _fontsCached2 = _interopRequireDefault(_fontsCached);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Intended to be inlined and injected in to the <head> of the page
 */
function inlineHeader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
    // Allow additional Google Fonts families to be passed in
  };if (options.families) {
    window.WebFontConfig.google.families.concat(options.families);
  }

  var webFontElement = document.createElement('script');
  webFontElement.src = (document.location.protocol === 'https:' ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  webFontElement.type = 'text/javascript';
  webFontElement.async = 'true';
  var first = document.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(webFontElement, first);
}