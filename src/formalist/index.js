import React, {
  Component,
  PropTypes,
} from 'react'
import ReactDOM from 'react-dom'
import template from 'formalist-standard-react'
import serialize from 'formalist-serialize-react'

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
    this.state = {
      formState,
      serialized: null,
    }
  }

  componentWillMount () {
    const {form} = this.props
    form.store.subscribe(() => {
      const formState = form.store.getState()
      this.setState({
        formState,
      })
    })
  }

  componentDidMount () {
    const self = this
    const {parentForm} = this.props
    if (parentForm) {
      // Ensure the serialize data get written before we submit
      parentForm.addEventListener('submit', function onParentSubmit (e) {
        e.preventDefault()
        const serialized = self.serializeForm()
        self.setState({
          serialized,
        }, () => {
          // After state is set, remove our listener and submit the form again
          parentForm.removeEventListener('submit', onParentSubmit)
          parentForm.submit()
        })
      })
    }
  }

  serializeForm () {
    const {prefix} = this.props
    const formState = this.props.form.store.getState()
    return serialize(
      formState.toJS(),
      {prefix}
    )
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
