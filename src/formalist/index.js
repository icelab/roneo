import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import template from 'formalist-standard-react'
import composeForm from 'formalist-compose'
import serialize from 'formalist-serialize-react'

/**
 * Simple wrapper to create the form outer
 */
class FormWrapper extends Component {

  constructor (props) {
    super(props)
    const form = this.props.form
    this.serializedFormTemplate = composeForm(
      serialize({
        prefix: props.prefix
      })
    )
    this.state = {
      formState: form.store.getState()
    }
  }

  componentWillMount () {
    const form = this.props.form
    form.store.subscribe(() => {
      this.setState({
        formState: form.store.getState()
      })
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !Immutable.is(this.state.formState, nextState.formState)
  }

  render () {
    const form = this.props.form
    const { formState } = this.state
    const serializedForm = this.serializedFormTemplate(formState)
    return (
      <div>
        {form.render()}
        {serializedForm.render()}
      </div>
    )
  }
}

FormWrapper.propTypes = {
  form: PropTypes.object.isRequired,
  prefix: PropTypes.string
}

/**
 * Viewloader compatible boot function
 * @param  {Element} el Element where the form will be mounted
 * @param  {AST} ast Formalist compatible abstract syntax tree
 */
export default function formalist (el, props) {
  let configuredTemplate = template()
  let form = configuredTemplate(props.ast)
  ReactDOM.render(<FormWrapper form={form} prefix={props.prefix} />, el)
}
