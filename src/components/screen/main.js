import { h, Component } from 'preact'
import classnames from 'classnames'
import style from './style.scss'
import { createIssue } from '../../helper/gh-helper'

import Heading from '../heading'
import Input from '../input'

export default class Main extends Component {
  titleRefs = []
  bodyRefs = []

  handleSubmit (e) {
    e && e.preventDefault()

    const { config = {} } = this.props || {}
    const { output = {} } = config
    const titleOutputs = this.titleRefs.map(r => r.output())
    const bodyOutputs = this.bodyRefs.map(r => r.output())

    return createIssue(this.props.owner, this.props.repo, titleOutputs, bodyOutputs, output)
      .then(url => {
        window.location.assign(url)
      })
      .catch(err => {
        window.alert((err && err.message) || 'Could not create issue')
      })
  }

  render (props) {
    const { owner, repo, config } = props || {}
    if (!owner || !repo || !config) return null

    const { input = {} } = config
    const { heading, title = [], body = [],
      customHeader, customFooter, customCSS, customJS } = input

    return (
      <form class={classnames('ni-form', style['_ni-form'])} onSubmit={e => this.handleSubmit(e)}>
        { typeof customHeader === 'string'
          ? <header class={classnames('ni-header', style['_ni-header'], 'ni-custom-header')} dangerouslySetInnerHTML={{__html: customHeader}} />
          : <header class={classnames('ni-header', style['_ni-header'])}>
            <Heading config={Object.assign({ owner, repo }, { heading: heading })} />
          </header> }
        <section class='ni-title-inputs'>
          { title.map((c, idx) => <Input ref={r => { this.titleRefs[idx] = r }} config={c} />) }
        </section>
        <section class='ni-body-inputs'>
          { body.map((c, idx) => <Input ref={r => { this.bodyRefs[idx] = r }} config={c} />) }
        </section>
        { typeof customFooter === 'string' ? <footer class={classnames('ni-footer', style['_ni-footer'], 'ni-custom-footer')} dangerouslySetInnerHTML={{__html: customFooter}} /> : null }
        { typeof customCSS === 'string' ? <style class='ni-custom-css' dangerouslySetInnerHTML={{__html: customCSS}} /> : null }
        { typeof customJS === 'string' ? <script class='ni-custom-js' dangerouslySetInnerHTML={{__html: customJS}} /> : null }
      </form>
    )
  }
}
