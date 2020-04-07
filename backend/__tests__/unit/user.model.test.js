const { User } = require('../../src/models/user')

describe('Valid Testcases', () => {
  test('should have two required string fields ', () => {
    const fields = ['firstname', 'lastname']
    fields.map(item => {
      const field = User.schema.paths[`${item}`]
      expect(field.instance).toBe('String')
      expect(field.isRequired).toBeTruthy()
    })
  })

  test('should have a required number field ', () => {
    const field = User.schema.paths.participation
    expect(field.instance).toBe('Number')
    expect(field.isRequired).toBeTruthy()
  })
})

describe('Invalid Testcases', () => {
  test('should return an error object when creates an user without required fields', () => {
    new User().validate(e => expect(e).toBeObject())
  })

  test('should be invalid if firstname, lastname and participation are empty', () => {
    const fields = ['firstname', 'lastname', 'participation']
    new User().validate(e => {
      fields.map(field => {
        expect(e.errors[field].message).toBe(`${field} is required.`)
      })
    })
  })

  test('should be invalid if participation min/max is not in allowed values', () => {
    const user1 = new User({ firstname: 'Paulo', lastname: 'Henrique', participation: -1 })
    const user2 = new User({ firstname: 'Paulo', lastname: 'Henrique', participation: 101 })

    user1.validate(e => {
      expect(e.errors.participation.message).toBe('participation is less than minimum allowed value.')
    })
    user2.validate(e => {
      expect(e.errors.participation.message).toBe('participation is greater than maximum allowed value.')
    })
  })
})
