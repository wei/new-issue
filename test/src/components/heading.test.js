/* eslint-env node, jest */

import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Heading from '../../../src/components/heading'

describe('Heading', () => {
  it('should render nothing with bad parameters', () => {
    [
      undefined,
      null,
      {},
      {owner: 'test'},
      {repo: 'test'},
    ].forEach(config => {
      const context = shallow(<Heading config={config} />)

      const h1 = context.find('h1')
      expect(h1.exists()).toBeFalsy()
      expect(context).toMatchSnapshot()
    })
  })

  it('should render with all parameters', () => {
    const config = {
      owner: 'wei',
      repo: 'new-issue',
      heading: 'new-issue' }
    const context = shallow(<Heading config={config} />)

    const h1 = context.find('h1')
    expect(h1.length).toBe(1)
    expect(h1.find('a').length).toBe(0)
    expect(context).toMatchSnapshot()
  })

  it('should render default heading if missing heading parameter', () => {
    const config = {
      owner: 'wei',
      repo: 'new-issue' }
    const context = shallow(<Heading config={config} />)

    const h1 = context.find('h1')
    expect(h1.length).toBe(1)
    expect(h1.find('a').length).toBe(2)
    expect(h1.find('a').at(0).attr('href')).toBe(`https://github.com/${config.owner}`)
    expect(h1.find('a').at(1).attr('href')).toBe(`https://github.com/${config.owner}/${config.repo}`)
    expect(h1.find('a').at(0).text()).toBe(`${config.owner}`)
    expect(h1.find('a').at(1).text()).toBe(`${config.repo}`)
    expect(context).toMatchSnapshot()
  })
})
