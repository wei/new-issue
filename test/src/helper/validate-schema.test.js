/* eslint-env node, jest */

import { validateSchema } from '../../../src/helper/validate-schema'

describe('validate new-issue json schema', () => {
  it('should not pass validation if json is invalid', () => {
    expect(validateSchema()).toBe(false)
    expect(validateSchema({})).toBe(false)
    expect(validateSchema({ no_version: true })).toBe(false)
    expect(validateSchema('')).toBe(false)
    expect(validateSchema(123)).toBe(false)
    expect(validateSchema({ version: 'x.x' })).toBe(false)
    expect(validateSchema({ version: '1.0' })).toBe(false)
  })

  test('example jsons should pass validation', () => {
    expect(validateSchema(require('../../sample-config/test-1.json'))).toBe(true)
    expect(validateSchema(require('../../sample-config/preact-cli.json'))).toBe(true)
  })
})
