'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fontsLoaded;

var _fontfaceobserver = require('fontfaceobserver');

var _fontfaceobserver2 = _interopRequireDefault(_fontfaceobserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fontsLoaded(fontsToCheck) {
  var timeout = 1500;
  var fontsLoaded = window.localStorage.getItem('fontsLoaded');

  if (!fontsLoaded) {
    var loading = fontsToCheck.map(function (font) {
      var observer = new _fontfaceobserver2.default(font.family, {
        weight: font.weight,
        style: font.style
      });
      return observer.load(null, timeout);
    });

    Promise.all(loading).then(function () {
      window.document.documentElement.className += ' fonts-loaded';
      window.localStorage.setItem('fontsLoaded', true);
    });
  }
} /**
   * Font loading
   * Implements deferred font-loading
   * https://www.filamentgroup.com/lab/font-events.html
   */