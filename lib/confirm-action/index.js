'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirmAction;
/**
 * Take a `button` or `a` and, on click, allow the default event to propagate
 * or create a form with `props.action` (and optionally `props.method`) and
 * submit it.
 */
function confirmAction(el, props) {
  var question = props.question;
  var action = props.action;
  var csrfTokenName = props.csrf_token_name || '_csrf';

  function onClick(e) {
    // Don't do anything if we can’t work out the action
    if (action == null) return;
    if (e.preventDefault) {
      e.preventDefault();
    }

    var confirmed = question == null ? true : window.confirm(question);

    if (confirmed) {
      var formMethod = props.method === 'GET' ? 'GET' : 'POST';

      // Create a <form>
      var form = document.createElement('form');
      form.setAttribute('method', formMethod);
      form.setAttribute('action', action);
      form.style.display = 'none';

      // Append the CRSF token if it exists
      if (props.method !== 'GET') {
        var csrfElement = document.querySelector('meta[name=' + csrfTokenName + ']');
        if (csrfElement) {
          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', csrfTokenName);
          input.setAttribute('value', csrfElement.getAttribute('content'));
          form.appendChild(input);
        }
      }

      if (props.method === 'PUT' || props.method === 'DELETE') {
        var _formMethod = props.method === 'PUT' ? 'put' : 'delete';
        var _input = document.createElement('input');
        _input.setAttribute('type', 'hidden');
        _input.setAttribute('name', '_method');
        _input.setAttribute('value', _formMethod);
        form.appendChild(_input);
      }

      document.querySelector('body').appendChild(form);
      form.submit();
    }
  }

  el.addEventListener('click', onClick);
}