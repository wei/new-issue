import { h, Component } from 'preact'
import classnames from 'classnames'
import { getGithubUrl } from '../../helper/gh-helper'

import style from './style.scss'

export default class Heading extends Component {
  render (props) {
    const { owner, repo, heading } = props.config || {}
    if (!owner || !repo) return null

    return heading
      ? <h1 class={classnames('ni-heading', style['_ni-heading'])} dangerouslySetInnerHTML={{ __html: heading }} />
      : <h1 class={classnames('ni-heading', style['_ni-heading'])}>
        <a class={classnames('ni-repo-link', style['_ni-repo-link'])} href={getGithubUrl(owner)} target='_blank'>{owner}</a>
        <span>/</span>
        <a class={classnames('ni-repo-link', style['_ni-repo-link'])} href={getGithubUrl(owner, repo)} target='_blank'><strong>{repo}</strong></a>
      </h1>
  }
}
