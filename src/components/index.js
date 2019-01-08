import { h, Component } from 'preact'
import classnames from 'classnames'
import style from './style.scss'
import { getUserInfo, triggerLogin } from '../helper/gh-helper'

import Main from './screen/main'
import IssueDirect from './screen/issue-direct'
import IssueLoading from './screen/issue-loading'

export default class Index extends Component {
  constructor (props) {
    super(props)

    this.state = {
      githubUser: null,
    }

    this.fetchUserInfo()
  }

  fetchUserInfo () {
    getUserInfo()
      .then(user => {
        this.setState({ githubUser: user })
      })
      .catch(() => {
        this.setState({ githubUser: false })
      })
  }

  handleLogin () {
    triggerLogin().then(token => {
      this.fetchUserInfo()
    })
  }

  getForm () {
    if (this.props.issueDirect) {
      return <IssueDirect {...this.props} />
    }
    if (!this.state.githubUser) {
      return <IssueLoading {...this.props} loading={this.state.githubUser === null} handleLogin={() => this.handleLogin()} />
    }

    return [
      <Main {...this.props} />,
      <p class={classnames('ni-footnote', style['_ni-footnote'])}><a href='https://github.com/wei/new-issue' target='_blank'>Customized issues interface for your repo</a></p>,
    ]
  }

  render (props, state) {
    const theme = (props.config && props.config.theme) || 'default'

    return <div class={classnames('ni-wrapper', style['_ni-wrapper'], `ni-theme-${theme}`)}>
      {this.getForm()}
    </div>
  }
}
