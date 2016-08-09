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
        }, 250
      )
    )
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
  prefix: PropTypes.string,
}

/**
 * Viewloader compatible boot function
 * @param  {Element} el Element where the form will be mounted
 * @param  {AST} ast Formalist compatible abstract syntax tree
 */
export default function formalist (el, props) {
  let configuredTemplate = template(null, props.config)
  let form = configuredTemplate(props.ast)
  ReactDOM.render(<FormWrapper form={form} prefix={props.prefix} />, el)
}
