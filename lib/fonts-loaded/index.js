'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fontsLoaded;

require('fontfaceobserver');

function fontsLoaded(fontsToCheck) {
  var fontsLoaded = window.localStorage.getItem('fontsLoaded');

  if (!fontsLoaded) {
    var loading = [];
    fontsToCheck.forEach(function (font) {
      var promise = new window.FontFaceObserver(font.family, {
        weight: font.weight,
        style: font.style
      });
      loading.push(promise.check());
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