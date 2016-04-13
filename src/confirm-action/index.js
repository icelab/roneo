/**
 * Take a `button` or `a` and, on click, allow the default event to propagate
 * or create a form with `props.action` (and optionally `props.method`) and
 * submit it.
 */
export default function confirmAction (el, props) {
  const question = props.question
  const action = props.action

  function onClick (e) {
    if (e.preventDefault) {
      e.preventDefault()
    }

    const confirmed = question == null ? true : window.confirm(question)

    if (confirmed) {
      let formMethod = (props.method === 'GET' ? 'GET' : 'POST')

      // Create a <form>
      const form = document.createElement('form')
      form.setAttribute('method', formMethod)
      form.setAttribute('action', action)
      form.style.display = 'none'

      // Append the CRSF token if it exists
      if (props.method !== 'GET') {
        let csrfElement = document.querySelector('meta[name=_csrf]')
        if (csrfElement) {
          let input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('name', '_csrf')
          input.setAttribute('value', csrfElement.getAttribute('content'))
          form.appendChild(input)
        }
      }

      if (props.method === 'PUT' || props.method === 'DELETE') {
        let formMethod = props.method === 'PUT' ? 'put' : 'delete'
        let input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', '_method')
        input.setAttribute('value', formMethod)
        form.appendChild(input)
      }

      document.querySelector('body').appendChild(form)
      form.submit()
    }
  }

  el.addEventListener('click', onClick)
}
