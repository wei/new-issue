/* eslint-env node, jest */

import 'jest-localstorage-mock'

import {
  getGithubUrl,
  getGithubIssuesUrl,
  fetchLocalAccessToken,
  setLocalAccessToken,
  // triggerLogin,
  getUserInfo,
  buildIssueTitle,
  buildIssueBody,
  createIssue,
} from '../../../src/helper/gh-helper'

beforeEach(() => {
  global.localStorage.clear()
  window.location.assign = jest.fn()
  window.fetch = jest.fn()
  window.open = jest.fn()
})

describe('gh-helper getGithubUrl', () => {
  it('should return github url', () => {
    expect(getGithubUrl()).toBe('https://github.com/')
    expect(getGithubUrl('wei')).toBe('https://github.com/wei')
    expect(getGithubUrl('wei', 'new-issue')).toBe('https://github.com/wei/new-issue')
  })
})

describe('gh-helper getGithubIssuesUrl', () => {
  it('should return github issues url', () => {
    expect(getGithubIssuesUrl()).toBeNull()
    expect(getGithubIssuesUrl('wei')).toBeNull()
    expect(getGithubIssuesUrl('wei', 'new-issue')).toBe('https://github.com/wei/new-issue/issues')
  })
})

describe('gh-helper localAccessToken', () => {
  it('should set localAccessToken', () => {
    let KEY = 'GITHUB_ACCESS_TOKEN'
    let TOKEN = 'test_token'

    expect(fetchLocalAccessToken()).toBe('')
    setLocalAccessToken(TOKEN)
    expect(global.localStorage.setItem).toBeCalledWith(KEY, TOKEN)
    expect(fetchLocalAccessToken()).toBe(TOKEN)
    expect(global.localStorage.getItem).toBeCalledWith(KEY)
  })
})

describe('gh-helper triggerLogin', () => {
  it('should trigger login', () => {
    // TODO Mock request
    window.location.host = 'new-issue.org'
  })
})

describe('gh-helper getUserInfo', () => {
  it('should getUserInfo no code', () => {
    setLocalAccessToken('')
    return getUserInfo()
      .catch(e => { expect(e.message).toBe('No Access Token') })
  })

  it('should getUserInfo no code', () => {
    const TOKEN = 'test_token'
    setLocalAccessToken(TOKEN)
    // TODO Mock request
  })
})

describe('gh-helper buildIssueTitle', () => {
  it('should return built issue title', () => {
    expect(buildIssueTitle()).toBe('')
    expect(buildIssueTitle([{label: 'label 1\n', value: 'value 1'}])).toMatchSnapshot()
    expect(buildIssueTitle([{label: 'label 1\n', value: 'value 1'}, {label: 'label 2\n', value: 'value 2'}]))
      .toMatchSnapshot()
  })
})

describe('gh-helper buildIssueBody', () => {
  it('should return built issue body', () => {
    expect(buildIssueBody())
      .toMatchSnapshot()
    expect(buildIssueBody([{label: 'label 1\n', value: 'value 1'}]))
      .toMatchSnapshot()
    expect(buildIssueBody([{label: 'label 1\n', value: 'value 1'}, {label: 'label 2\n', value: 'value 2'}]))
      .toMatchSnapshot()
    expect(buildIssueBody([{}, {label: 'label 1\n', value: null}, {label: 'label 2\n'}, {label: 'label 3\n', value: 'value 3'}]))
      .toMatchSnapshot()
    expect(buildIssueBody([{label: 'label 1\n', value: ''}, {label: 'label 2\n', value: 'value 2'}], {hideEmpty: true}))
      .toMatchSnapshot()
    expect(buildIssueBody([{label: 'label 1\n'}, {label: 'label 2\n', value: 'value 2'}], {hideEmpty: true}))
      .toMatchSnapshot()
    expect(buildIssueBody([{value: 'value 1'}, {label: 'label 2\n', value: 'value 2'}], {hideEmpty: true}))
      .toMatchSnapshot()
    expect(buildIssueBody([{label: null, value: 'value 1'}, {label: 'label 2\n', value: 'value 2'}], {hideEmpty: true}))
      .toMatchSnapshot()
  })
})

describe('gh-helper createIssue', () => {
  it('should create issue', async () => {
    await expect(createIssue()).rejects.toThrow()
    await expect(createIssue('wei')).rejects.toThrow()
    // TODO Mock request
  })
})
