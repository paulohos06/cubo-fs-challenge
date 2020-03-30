const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/user')

describe('Test the root path', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await cleanDB()
    mongoose.disconnect()
  })

  it('GET / should return status code 200', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('POST / should create a new user', async () => {
    const res = await request(app).post('/').send({
      firstname: 'Paulo',
      lastname: 'Henrique',
      participation: 50
    })
    expect(res.status).toEqual(200)
    expect(res.body.user.firstname).toBe('Paulo')
  })
})

const cleanDB = async () => {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}
