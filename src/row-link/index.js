/**
 * Navigat to the passed `href`
 * @param  {Event} e The original event
 * @param  {String} href The URL to visit
 * @return {Void}
 */
function goToLink (e, href) {
  if (e.metaKey) {
    window.open(href)
  } else {
    if (window.Turbolinks) {
      window.Turbolinks.visit(href)
    } else {
      window.location = href
    }
  }
}

/**
 * Allow the passed `el` to act like a link. Useful for having `<tr>` elements
 * link to their default action.
 * @param  {Node} el Bound element
 * @param  {Strng} props.href The link to send to
 * @return {Void}
 */
export default function rowLink (el, props) {
  el.addEventListener('click', (e) => {
    // Let other semantic clickables do their thing
    if (e.target.nodeName !== 'A' && e.target.nodeName !== 'BUTTON') {
      e.preventDefault()
      goToLink(e, props.href)
    }
  })
}
