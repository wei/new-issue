import { h, Component } from 'preact'
import classnames from 'classnames'
import linkState from 'linkstate'
import style from './style.scss'

export default class Input extends Component {
  state = {
    userInput: (this.props.config && this.props.config.value) || '',
  }

  getLabel () {
    const labelText = (this.props.config && this.props.config.label) || ''
    return <label class={classnames('ni-label', style['_ni-label'], {'ni-empty-label': !labelText})}>{labelText}</label>
  }

  getInput () {
    const config = (this.props && this.props.config) || {}
    const { type, name, id, class: className, title } = config
    const { userInput } = this.state

    switch (type) {
      case 'text':
      case 'number':
      case 'password':
      case 'email':
      case 'month':
      case 'date':
      case 'datetime-local':
      case 'hidden': {
        const { placeholder, required, disabled, pattern, maxlength } = config
        return <input type={type} name={name} id={id} class={classnames('ni-input', `ni-${type}`, style[`_ni-input`], style[`_ni-${type}`], className)}
          title={title} required={required} disabled={disabled} placeholder={placeholder} pattern={pattern} maxlength={maxlength} value={userInput} onInput={linkState(this, 'userInput')} />
      }
      case 'textarea': {
        const { placeholder, required, disabled, rows, maxlength } = config
        return <textarea name={name} id={id} class={classnames('ni-input', `ni-${type}`, style[`_ni-input`], style[`_ni-${type}`], className)}
          title={title} required={required} disabled={disabled} rows={rows || 4} maxlength={maxlength} placeholder={placeholder} value={userInput} onInput={linkState(this, 'userInput')} />
      }
      case 'select': {
        const { placeholder, required, disabled, value, options = [] } = config
        return <select name={name} id={id} class={classnames('ni-input', `ni-${type}`, style[`_ni-input`], style[`_ni-${type}`], className)}
          title={title} required={required} disabled={disabled} placeholder={placeholder || ''} onInput={linkState(this, 'userInput')}>
          {
            !value
              ? <option value='' selected={userInput === ''}>{placeholder || ''}</option>
              : null
          }
          {
            options.map(o =>
              <option value={o} selected={o === userInput}>{o}</option>
            )
          }
        </select>
      }
      case 'submit': {
        const { submit, disabled } = config
        return <button type={type} name={name} id={id} class={classnames('ni-input', `ni-${type}`, style[`_ni-input`], style[`_ni-${type}`], className)}
          title={title} disabled={disabled} dangerouslySetInnerHTML={{__html: submit || 'Submit'}} />
      }
      case 'html': {
        const { html } = config
        return <div id={id} class={classnames('ni-input', `ni-${type}`, style[`_ni-input`], style[`_ni-${type}`], className)} title={title}
          dangerouslySetInnerHTML={{__html: html}} />
      }
      default: {
        return null
      }
    }
  }

  output () {
    const { 'outputLabel.md': outputLabel, label } = this.props.config

    return {
      label: outputLabel || (label && `**${label}:**\n`) || null,
      value: this.state.userInput,
    }
  }

  render (props, state) {
    const { type, id, class: className } = props.config || {}

    return <div id={id && `${id}-wrapper`} class={classnames('ni-wrapper', `ni-wrapper-${type}`, style[`_ni-wrapper`], style[`_ni-wrapper-${type}`], className && `${className}-wrapper`)}>
      { this.getLabel() }
      { this.getInput() }
    </div>
  }
}
