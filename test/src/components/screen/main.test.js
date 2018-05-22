/* eslint-env node, jest */

import { h } from 'preact'
import { deep } from 'preact-render-spy'

import Main from '../../../../src/components/screen/main'

beforeEach(() => {
  window.open = jest.fn()
  window.location.assign = jest.fn()
  window.alert = jest.fn()
})

describe('Main - missing parameters', () => {
  it('should not render if owner or repo is missing or invalid', () => {
    [
      <Main />,
      <Main config={{}} />,
      <Main owner='wei' />,
      <Main repo='new-issue' config={{}} />,
    ].forEach(component => {
      const context = deep(component)

      expect(context.children().length).toBe(0)
      expect(context.text()).toBe('')
      expect(context).toMatchSnapshot()
    })
  })
})

describe('Main', () => {
  [
    { owner: 'developit', repo: 'preact-cli' },
    { owner: 'test', repo: 'test-1' },
  ].forEach(({ owner, repo }) => {
    it(`should render and function correctly for ${owner}/${repo}`, () => {
      const config = require(`../../../sample-config/${repo}.json`)

      const context = deep(<Main owner={owner} repo={repo} config={config} />)
      expect(context).toMatchSnapshot()

      const preventDefault = jest.fn()
      context.component().handleSubmit({preventDefault: preventDefault})
      expect(preventDefault).toBeCalled()
    })
  })
})
