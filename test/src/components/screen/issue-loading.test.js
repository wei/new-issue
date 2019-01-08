/* eslint-env node, jest */

import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import IssueLoading from '../../../../src/components/screen/issue-loading'

describe('IssueLoading - missing parameters', () => {
  it('should not render if owner or repo is missing or invalid', () => {
    [
      <IssueLoading />,
      <IssueLoading config={{}} />,
      <IssueLoading owner='wei' />,
      <IssueLoading repo='new-issue' config={{}} />,
    ].forEach(component => {
      const context = shallow(component)

      expect(context.children().length).toBe(0)
      expect(context.text()).toBe('')
      expect(context).toMatchSnapshot()
    })
  })
})

describe('IssueLoading', () => {
  [
    { owner: 'developit', repo: 'preact-cli' },
    { owner: 'test', repo: 'test-1' },
  ].forEach(({ owner, repo }) => {
    it(`should render and function correctly for ${owner}/${repo}`, () => {
      const config = require(`../../../sample-config/${repo}.json`)

      const handleLogin1 = jest.fn()
      const context1 = shallow(<IssueLoading owner={owner} repo={repo} loading handleLogin={handleLogin1} config={config} />)
      expect(context1).toMatchSnapshot()
      const preventDefault = jest.fn()
      context1.component().handleSubmit({ preventDefault: preventDefault })
      expect(preventDefault).toBeCalled()
      expect(handleLogin1).toBeCalled()

      const handleLogin2 = jest.fn()
      const context2 = shallow(<IssueLoading owner={owner} repo={repo} loading={false} handleLogin={handleLogin2} config={config} />)
      expect(context2).toMatchSnapshot()
      context2.component().handleSubmit()
      expect(handleLogin2).toBeCalled()
    })
  })
})
