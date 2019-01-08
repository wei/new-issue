import { h, Component } from 'preact'
import classnames from 'classnames'
import { getGithubIssuesUrl } from '../../helper/gh-helper'

import style from './style.scss'

import Heading from '../heading'
import Input from '../input'

export default class IssueDirect extends Component {
  handleSubmit (e) {
    e && e.preventDefault()

    const redirectUrl = `${getGithubIssuesUrl(this.props.owner, this.props.repo)}`
    window.location.assign(redirectUrl)
    return redirectUrl
  }

  render (props) {
    const { owner, repo } = props
    if (!owner || !repo) return null

    return <form class={classnames('ni-form', style['_ni-form'])} onSubmit={e => this.handleSubmit(e)}>
      <br /><br /><br />
      <header class={classnames('ni-header', style['_ni-header'])}>
        <Heading config={{ owner, repo }} />
      </header>
      <br /><br />
      <footer class={classnames('ni-footer', style['_ni-footer'], 'text-center')}>
        <Input config={{ type: 'submit', submit: 'Submit New Issue on Github' }} />
      </footer>
      <br />
    </form>
  }
}
