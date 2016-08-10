'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirmClick;
/**
 * Take a `button` or `a` and, on click, allow the default event to propagate or
 * not depends on the results of `confirm()`
 */
function confirmClick(el, props) {
  var question = props.question;
  var action = props.action || el.getAttribute('href');

  function onClick(e) {
    // Don't do anything if we can’t work out the action
    if (action == null) return;
    var confirmed = question == null ? true : window.confirm(question);
    if (!confirmed) {
      e.preventDefault();
    }
  }
  el.addEventListener('click', onClick);
}