import domready from 'domready'
import viewloader from 'viewloader'

// Components
import views from './views'

export default function roneo () {
  // Kick off
  domready(function onDomReady () {
    viewloader.execute(views)
  })

  /**
   * Make adjustments based on metaQuery breakpoints
   * Assumes that metaQuery is an object on window (because it should be inlined)
   */
  if (window.metaQuery) {
    window.metaQuery.onBreakpointChange('widescreen', function onBreakpointChangeWidescreen (matches) {
      if (matches) {
        // Remove any `.nav-open` classes when widescreen
        var navOpenElements = Array.prototype.slice.call(
          document.querySelectorAll('.nav-open')
        )
        navOpenElements.map((el) => {
          el.classList.remove('nav-open')
        })
      }
    })
  }
}
