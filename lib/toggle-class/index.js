'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleClass;
/**
 * Toggle the `options.targetToggleClassName` on the passed
 * `props.targetSelector` elements when the `el` is
 * `props.event-ed` (click for example)
 */
function toggleClass(el, props) {
  var defaults = {
    event: 'click',
    preventDefault: true
  };
  var options = Object.assign(defaults, props);
  var targets = Array.prototype.slice.call(document.querySelectorAll(options.targetSelector));

  // Remove the loadClass on initialisation
  if (options.targetLoadClassName) {
    targets.forEach(function (target) {
      target.classList.remove(options.targetLoadClassName);
    });
  }

  // Bind to the passed event
  el.addEventListener(options.event, function (e) {
    if (options.preventDefault) {
      e.preventDefault();
    }
    targets.forEach(function (target) {
      target.classList.toggle(options.targetToggleClassName);
    });
    if (options.triggerToggleClassName) {
      el.classList.toggle(options.triggerToggleClassName);
    }
  });

  // Trigger after timeout
  if (options.triggerAfter) {
    setTimeout(function () {
      el[options.event]();
    }, options.triggerAfter);
  }
}