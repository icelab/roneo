/**
 * Font loading
 * Implements deferred font-loading
 * https://www.filamentgroup.com/lab/font-events.html
 */

import 'fontfaceobserver'

export default function fontsLoaded (fontsToCheck) {
  var fontsLoaded = window.localStorage.getItem('fontsLoaded')

  if (!fontsLoaded) {
    var loading = []
    fontsToCheck.forEach((font) => {
      const promise = new window.FontFaceObserver(font.family, {
        weight: font.weight,
        style: font.style
      })
      loading.push(promise.check())
    })

    Promise.all(loading).then(() => {
      window.document.documentElement.className += ' fonts-loaded'
      window.localStorage.setItem('fontsLoaded', true)
    })
  }
}
