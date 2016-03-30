/**
 * Toggle the `options.targetToggleClassName` on the passed
 * `props.targetSelector` elements when the `el` is
 * `props.event-ed` (click for example)
 */
export default function toggleClass (el, props) {
  const defaults = {
    event: 'click',
    preventDefault: true
  }
  const options = Object.assign(defaults, props)
  const targets = Array.prototype.slice.call(
    document.querySelectorAll(options.targetSelector)
  )

  // Remove the loadClass on initialisation
  if (options.targetLoadClassName) {
    targets.forEach((target) => {
      target.classList.remove(options.targetLoadClassName)
    })
  }

  // Bind to the passed event
  el.addEventListener(options.event, (e) => {
    if (options.preventDefault) {
      e.preventDefault()
    }
    targets.forEach((target) => {
      target.classList.toggle(options.targetToggleClassName)
    })
    if (options.triggerToggleClassName) {
      el.classList.toggle(options.triggerToggleClassName)
    }
  })

  // Trigger after timeout
  if (options.triggerAfter) {
    setTimeout(() => {
      el[options.event]()
    }, options.triggerAfter)
  }
}
