/* eslint-env node, jest */

import glob from 'glob'
import { validateSchema } from '../src/helper'

describe('repo configs should pass schema validation', () => {
  const files = glob.sync('./repos/**/*.json')
  files.forEach(file => {
    test(`validate schema for ${file}`, () => {
      expect(validateSchema(require(`.${file}`))).toBe(true)
    })
  })
})
