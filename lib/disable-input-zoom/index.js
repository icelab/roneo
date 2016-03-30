'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = disableInputZoom;
var allowDisable = false;

/**
 * Enable/disable the zoom disabling function. Meta, I know.
 */
if (window.metaQuery) {
  window.metaQuery.onBreakpointChange('phone', function (matches) {
    allowDisable = matches;
  });
}

/**
 * Toggle scaling using the viewport meta directive
 * @param  {Element} viewport The viewport meta element
 * @param  {Boolean} enable Enable/disable
 * @return {Null}
 */
function toggleViewportScale(viewport, enable) {
  var value = viewport.getAttribute('content');
  var setting = enable ? 'yes' : 'no';
  var pattern = /user-scalable=(no|yes)/;
  if (value.match(pattern)) {
    value = value.replace(pattern, 'user-scalable=' + setting);
  } else {
    value = value + ', user-scalable=' + setting;
  }
  viewport.setAttribute('content', value);
}

/**
 * Disable zooming
 * @param  {Element} viewport View meta element
 * @param  {Event} e Touch event
 * @return {Null}
 */
function disableZoom(viewport, e) {
  var targetNodeName = e.target.nodeName;
  if (targetNodeName === 'INPUT' || targetNodeName === 'SELECT' || targetNodeName === 'TEXTAREA') {
    toggleViewportScale(viewport, false);
  }
}

/**
 * Enable zooming
 * @param  {Element} viewport View meta element
 * @param  {Event} e Touch event
 * @return {Null}
 */
function enableZoom(viewport, e) {
  toggleViewportScale(viewport, true);
}

/**
 * Disable input zooming
 * @param  {Element} el Element scope to bind events to (usually body)
 * @return {Null}
 */
function disableInputZoom(el) {
  var viewport = document.querySelector('meta[name="viewport"]');
  var timer = null;
  if (viewport) {
    el.addEventListener('touchstart', function (e) {
      if (allowDisable) {
        clearTimeout(timer);
        disableZoom(viewport, e);
      }
    });
    el.addEventListener('touchend', function (e) {
      if (allowDisable) {
        timer = setTimeout(function () {
          enableZoom(viewport, e);
        }, 500);
      }
    });
  }
}