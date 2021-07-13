import fontsCached from '../fonts-cached'

/**
 * Intended to be inlined and injected in to the <head> of the page
 */
export default function inlineHeader (options = {}) {
  /**
   * Check if fonts are cached
   */
  fontsCached()

  /**
   * Load fonts from Google Fonts
   */
  window.WebFontConfig = {
    google: {
      families: [
        'Work+Sans:400,600:latin',
        'Inconsolata::latin',
      ],
    },
  }
  // Allow additional Google Fonts families to be passed in
  if (options.families) {
    window.WebFontConfig.google.families.concat(options.families)
  }

  const webFontElement = document.createElement('script')
  webFontElement.src = (document.location.protocol === 'https:' ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
  webFontElement.type = 'text/javascript'
  webFontElement.async = 'true'
  const first = document.getElementsByTagName('script')[0]
  first.parentNode.insertBefore(webFontElement, first)
}
