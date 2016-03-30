/**
 * Check if fonts are preloaded
 * Add a class to the `html` element if they are
 */

export default function checkFontsPreloaded () {
  if (window.localStorage.getItem('fontsLoaded')) {
    window.document.documentElement.className += ' fonts-loaded'
  }
}
