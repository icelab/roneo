/**
 * Font loading
 * Implements deferred font-loading
 * https://www.filamentgroup.com/lab/font-events.html
 */

import 'fontfaceobserver'

export default function fontsLoaded (fontsToCheck) {
  var timeout = 1500
  var fontsLoaded = window.localStorage.getItem('fontsLoaded')

  if (!fontsLoaded) {
    var loading = fontsToCheck.map((font) => {
      const observer = new window.FontFaceObserver(font.family, {
        weight: font.weight,
        style: font.style,
      })
      return observer.load(null, timeout)
    })

    Promise.all(loading).then(() => {
      window.document.documentElement.className += ' fonts-loaded'
      window.localStorage.setItem('fontsLoaded', true)
    })
  }
}
