import React, {
  Component,
  PropTypes,
} from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import template from 'formalist-standard-react'
import serialize from 'formalist-serialize-react'
import debounce from 'lodash.debounce'
import 'ric'

/**
 * Recurse to find the first FORM that is a parent of `el`
 * @param  {Node} el Child node to check parents of
 * @return {Mixed} The parent node or false
 */
function findParentForm (el) {
  const parentNode = el.parentNode
  if (parentNode) {
    if (parentNode.nodeName === 'FORM') {
      return parentNode
    } else {
      return findParentForm(parentNode)
    }
  }
  return false
}

/**
 * Simple wrapper to create the form outer
 */
class FormWrapper extends Component {

  constructor (props) {
    super(props)
    const {form} = this.props
    const formState = form.store.getState()
    const serialized = this.serializeForm(formState)
    this.state = {
      formState,
      serialized,
    }
  }

  componentWillMount () {
    const {form} = this.props
    form.store.subscribe(
      // Debounce the reducer
      debounce(
        () => {
          // Wait for an idle callback to trigger the serialized render
          // as it’s less important and more expensive
          window.requestUserIdle(() => {
            const formState = form.store.getState()
            const serialized = this.serializeForm(formState)
            this.setState({
              formState,
              serialized,
            })
          })
        }, 30
      )
    )
  }

  componentDidMount () {
    const self = this
    const {parentForm, form} = this.props
    if (parentForm) {
      // Ensure the serialize data get written before we submit
      parentForm.addEventListener('submit', function onParentSubmit (e) {
        e.preventDefault()
        const formState = form.store.getState()
        const serialized = self.serializeForm(formState)
        self.setState({
          formState,
          serialized,
        }, () => {
          // After state is set, remove our listener and submit the form again
          parentForm.removeEventListener('submit', onParentSubmit)
          parentForm.submit()
        })
      })
    }
  }

  serializeForm (formState) {
    const {prefix} = this.props
    formState = formState || this.props.form.store.getState()
    return serialize(
      formState.toJS(),
      {prefix}
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !Immutable.is(this.state.formState, nextState.formState)
  }

  render () {
    const {form} = this.props
    const {serialized} = this.state
    return (
      <div>
        {form.render()}
        {serialized}
      </div>
    )
  }
}

FormWrapper.propTypes = {
  form: PropTypes.object.isRequired,
  parentForm: PropTypes.object,
  prefix: PropTypes.string,
}

const defaultOptions = {
  serializeBeforeParentSubmit: true,
}

/**
 * Viewloader compatible boot function
 * @param  {Element} el Element where the form will be mounted
 * @param  {AST} ast Formalist compatible abstract syntax tree
 */
export default function formalist (el, props) {
  const options = Object.assign({}, defaultOptions, props)
  const configuredTemplate = template(null, options.config)
  const form = configuredTemplate(options.ast)
  const wrapperProps = {
    form,
    prefix: options.prefix,
  }
  // Pass through the parent form if we want to bind the serialize
  if (options.serializeBeforeParentSubmit) {
    const parentForm = findParentForm(el)
    if (parentForm) {
      wrapperProps.parentForm = parentForm
    }
  }
  ReactDOM.render(
    <FormWrapper {...wrapperProps} />,
    el
  )
}
