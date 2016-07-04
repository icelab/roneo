import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import template from 'formalist-standard-react'
import serialize from 'formalist-serialize-react'

/**
 * Simple wrapper to create the form outer
 */
class FormWrapper extends Component {

  constructor (props) {
    super(props)
    const form = this.props.form
    this.state = {
      formState: form.store.getState(),
    }
  }

  componentWillMount () {
    const form = this.props.form
    form.store.subscribe(() => {
      this.setState({
        formState: form.store.getState(),
      })
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !Immutable.is(this.state.formState, nextState.formState)
  }

  render () {
    const {form, prefix} = this.props
    const {formState} = this.state
    return (
      <div>
        {form.render()}
        {serialize(formState, { prefix })}
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
