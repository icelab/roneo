import fontsLoaded from '../fonts-loaded'
const fontsToCheck = [
  {
    family: 'Work Sans',
    style: 'normal',
    weight: '400',
  },
  {
    family: 'Work Sans',
    style: 'italic',
    weight: '400',
  },
  {
    family: 'Work Sans',
    style: 'normal',
    weight: '600',
  },
  {
    family: 'Work Sans',
    style: 'italic',
    weight: '600',
  },
  {
    family: 'Inconsolata',
    style: 'normal',
    weight: '400',
  },
  {
    family: 'Inconsolata',
    style: 'italic',
    weight: '400',
  },
]

/**
 * Intended to be inlined and injected in to the footer (end) of the page
 */
export default function inlineFooter (options = {}) {
  let {fonts} = options
  if (fonts) {
    fontsToCheck.concat(fonts)
  }
  fontsLoaded(fontsToCheck)
}
