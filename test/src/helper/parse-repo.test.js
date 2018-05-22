/* eslint-env node, jest */

import {
  parseRepo,
} from '../../../src/helper/parse-repo'

describe('parse repo from url pathname', () => {
  it('should return null if pathname is missing or malformed', () => {
    expect(parseRepo()).toBeNull()
    expect(parseRepo('')).toBeNull()
    expect(parseRepo({})).toBeNull()
    expect(parseRepo(null)).toBeNull()
    expect(parseRepo('bad')).toBeNull()
    expect(parseRepo('/bad')).toBeNull()
  })

  it('should parse /owner/repo correctly', () => {
    expect(parseRepo('/name/repo')).toMatchSnapshot()
    expect(parseRepo('/1/2')).toMatchSnapshot()
    expect(parseRepo('/1.1/2.2')).toMatchSnapshot()
    expect(parseRepo('/n__+/-__r')).toMatchSnapshot()
  })

  it('should parse /owner/repo#hash correctly', () => {
    expect(parseRepo('/name/repo')).toMatchSnapshot()
    expect(parseRepo('/1/2')).toMatchSnapshot()
    expect(parseRepo('/1.1/2.2')).toMatchSnapshot()
    expect(parseRepo('/n__+/-__r')).toMatchSnapshot()
  })

  it('should parse /owner/repo/type correctly', () => {
    expect(parseRepo('/name/repo/type')).toMatchSnapshot()
    expect(parseRepo('/1/2/3')).toMatchSnapshot()
    expect(parseRepo('/1.1/2.2/3.3')).toMatchSnapshot()
    expect(parseRepo('/n__+/-__r/_---_')).toMatchSnapshot()
  })

  it('should parse /owner/repo/type#hash correctly', () => {
    expect(parseRepo('/name/repo/type', '#1a2b3c')).toMatchSnapshot()
    expect(parseRepo('/1/2/3', '1a2b3c')).toMatchSnapshot()
    expect(parseRepo('/1.1/2.2/3.3', '#1a2b3c')).toMatchSnapshot()
    expect(parseRepo('/n__+/-__r/_---_', '1a2b3c')).toMatchSnapshot()
  })
})
