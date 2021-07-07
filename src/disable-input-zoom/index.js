let allowDisable = false

/**
 * Enable/disable the zoom disabling function. Meta, I know.
 */
const phoneBreakpoint = window.matchMedia("(max-width: 639px)")
phoneBreakpoint.addEventListener("change", (e) => {
  if (e.matches) {
    allowDisable = matches
  }
})


/**
 * Toggle scaling using the viewport meta directive
 * @param  {Element} viewport The viewport meta element
 * @param  {Boolean} enable Enable/disable
 * @return {Null}
 */
function toggleViewportScale (viewport, enable) {
  let value = viewport.getAttribute('content')
  let setting = (enable) ? 'yes' : 'no'
  const pattern = /user-scalable=(no|yes)/
  if (value.match(pattern)) {
    value = value.replace(pattern, `user-scalable=${setting}`)
  } else {
    value = `${value}, user-scalable=${setting}`
  }
  viewport.setAttribute('content', value)
}

/**
 * Disable zooming
 * @param  {Element} viewport View meta element
 * @param  {Event} e Touch event
 * @return {Null}
 */
function disableZoom (viewport, e) {
  let targetNodeName = e.target.nodeName
  if (targetNodeName === 'INPUT' || targetNodeName === 'SELECT' || targetNodeName === 'TEXTAREA') {
    toggleViewportScale(viewport, false)
  }
}

/**
 * Enable zooming
 * @param  {Element} viewport View meta element
 * @param  {Event} e Touch event
 * @return {Null}
 */
function enableZoom (viewport, e) {
  toggleViewportScale(viewport, true)
}

/**
 * Disable input zooming
 * @param  {Element} el Element scope to bind events to (usually body)
 * @return {Null}
 */
export default function disableInputZoom (el) {
  const viewport = document.querySelector('meta[name="viewport"]')
  let timer = null
  if (viewport) {
    el.addEventListener('touchstart', (e) => {
      if (allowDisable) {
        clearTimeout(timer)
        disableZoom(viewport, e)
      }
    })
    el.addEventListener('touchend', (e) => {
      if (allowDisable) {
        timer = setTimeout(() => {
          enableZoom(viewport, e)
        }, 500)
      }
    })
  }
}
