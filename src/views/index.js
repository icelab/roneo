import confirmAction from '../confirm-action'
import confirmClick from '../confirm-click'
import disableInputZoom from '../disable-input-zoom'
import formalist from '../formalist'
import fastClick from '../fast-click'
import rowLink from '../row-link'
import toggleClass from '../toggle-class'

/**
 * Singleton object we bind use to bind DOM elements to functions through
 * the viewloader library.
 *
 * snakeCase-named functions are matched to dasher-ize-d DOM nodes:
 *
 *   <div class="foo" data-view-foo-bar="hello">
 *   views.fooBar = function(el, props) {
 *     el.classList.has("foo") // true
 *     props === "hello" // true
 *   }
 *
 * @type {Object}
 */

export default {
  confirmAction,
  confirmClick,
  disableInputZoom,
  fastClick,
  formalist,
  rowLink,
  toggleClass,
}
