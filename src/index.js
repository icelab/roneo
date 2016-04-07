import 'turbolinks'
import viewloader from 'viewloader'

// Components
import views from './views'

function removeNavOpenClasses () {
  // Remove any `.nav-aware` classes when widescreen
  let navAwareEls = Array.prototype.slice.call(
    document.querySelectorAll('.nav-aware')
  )
  navAwareEls.map((el) => {
    el.classList.remove('nav-open')
  })
}

export default function roneo () {
  // DOMContentLoaded equivalent with Turbolinks
  document.addEventListener('turbolinks:load', function onTurboLinksLoad () {
    viewloader.execute(views)
  })

  // Hide nav when navigating
  document.addEventListener('turbolinks:request-start', () => {
    setTimeout(removeNavOpenClasses, 50)
    let pageEl = document.querySelector('.page')
    pageEl.classList.add('page--inactive')
  })

  /**
   * Make adjustments based on metaQuery breakpoints
   * Assumes that metaQuery is an object on window (because it should be inlined)
   */
  if (window.metaQuery) {
    window.metaQuery.onBreakpointChange('widescreen', function onBreakpointChangeWidescreen (matches) {
      if (matches) {
        removeNavOpenClasses()
      }
    })
  }
}
