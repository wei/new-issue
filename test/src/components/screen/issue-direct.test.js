/* eslint-env node, jest */

import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import { getGithubIssuesUrl } from '../../../../src/helper/gh-helper'

import IssueDirect from '../../../../src/components/screen/issue-direct'

beforeEach(() => {
  window.location.assign = jest.fn()
})

describe('IssueDirect - missing parameters', () => {
  it('should not render if owner or repo is missing or invalid', () => {
    [
      <IssueDirect />,
      <IssueDirect config={{}} />,
      <IssueDirect owner='wei' />,
      <IssueDirect repo='new-issue' config={{}} />,
    ].forEach(component => {
      const context = shallow(component)

      expect(context.children().length).toBe(0)
      expect(context.text()).toBe('')
      expect(context).toMatchSnapshot()
    })
  })
})

describe('IssueDirect', () => {
  [
    { owner: 'developit', repo: 'preact-cli' },
    { owner: 'test', repo: 'test-1' },
  ].forEach(({ owner, repo }) => {
    it(`should render and function correctly for ${owner}/${repo}`, () => {
      const config = require(`../../../sample-config/${repo}.json`)

      const context = shallow(<IssueDirect owner={owner} repo={repo} config={config} />)
      expect(context).toMatchSnapshot()
      const preventDefault = jest.fn()
      context.component().handleSubmit({ preventDefault: preventDefault })
      expect(preventDefault).toBeCalled()
      expect(window.location.assign).toBeCalledWith(`${getGithubIssuesUrl(owner, repo)}`)
    })
  })
})
