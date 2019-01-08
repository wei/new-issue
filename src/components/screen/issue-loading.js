import { h, Component } from 'preact'
import classnames from 'classnames'
import style from './style.scss'

import Heading from '../heading'
import Input from '../input'

export default class IssueLoading extends Component {
  handleSubmit (e) {
    e && e.preventDefault()

    this.props.handleLogin()
  }

  render (props) {
    const { owner, repo } = props
    if (!owner || !repo) return null

    return <form class={classnames('ni-form', style['_ni-form'], 'ni-loading', style['_ni-loading'])} onSubmit={e => this.handleSubmit(e)}>
      <br /><br /><br />
      <header class={classnames('ni-header', style['_ni-header'])}>
        <Heading config={{ owner, repo }} />
      </header>
      <br /><br />
      <footer class={classnames('ni-footer', style['_ni-footer'], 'text-center')}>
        <Input config={{ type: 'submit', submit: props.loading ? 'Loading...' : 'New Issue', disabled: props.loading }} />
      </footer>
      <br />
    </form>
  }
}
