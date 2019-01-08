import Ajv from 'ajv'
const ajv = new Ajv({ allErrors: true })

const validateSchema = (json) => {
  try {
    if (typeof json === 'object' && json.version) {
      const schema = require(`../../schema/${json.version}.json`)
      const valid = ajv.validate(schema, json)
      if (!valid) {
        throw new Error(ajv.errorsText(ajv.errors))
      } else {
        return true
      }
    }
    throw new Error('JSON parse error')
  } catch (ex) {
    window.console.warn(ex.message)
    return false
  }
}

export {
  validateSchema,
}
