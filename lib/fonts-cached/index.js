'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkFontsPreloaded;
/**
 * Check if fonts are preloaded
 * Add a class to the `html` element if they are
 */

function checkFontsPreloaded() {
  if (window.localStorage.getItem('fontsLoaded')) {
    window.document.documentElement.className += ' fonts-loaded';
  }
}