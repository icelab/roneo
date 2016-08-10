/**
 * Take a `button` or `a` and, on click, allow the default event to propagate or
 * not depends on the results of `confirm()`
 */
export default function confirmClick (el, props) {
  const question = props.question
  const action = props.action || el.getAttribute('href')

  function onClick (e) {
    // Don't do anything if we can’t work out the action
    if (action == null) return
    const confirmed = question == null ? true : window.confirm(question)
    if (!confirmed) {
      e.preventDefault()
    }
  }
  el.addEventListener('click', onClick)
}
