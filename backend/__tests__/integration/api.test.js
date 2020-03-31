const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../src/app')

const mongo = 'mongodb://localhost/tests'
mongoose.Promise = global.Promise

describe('API Valid Testcases', () => {
  beforeAll(async () => {
    await mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  })

  afterAll(async () => {
    await cleanDB()
    await mongoose.disconnect()
  })

  test('GET / should return status code 200', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.success).toBeTruthy()
  })

  test('POST / should return status code 201', async () => {
    const response = await request(app).post('/').send({
      firstname: 'Paulo',
      lastname: 'Henrique',
      participation: 50
    })
    expect(response.status).toEqual(201)
    expect(response.res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(response.body.success).toBeTruthy()
  })

  test('DELETE /valid-id should return status code 204', async () => {
    const user = await request(app).post('/').send({
      firstname: 'Paulo',
      lastname: 'Henrique',
      participation: 50
    })
    const response = await request(app).del(`/${user.body.user._id}`)
    expect(response.status).toEqual(204)
    expect(response.body).toEqual({})
  })
})

describe('API Invalid Testcases', () => {
  beforeAll(async () => {
    await mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  })

  afterAll(async () => {
    await cleanDB()
    await mongoose.disconnect()
  })

  test('GET /invalid-url should return status code 404', async () => {
    const response = await request(app).get('/invalid-url')
    expect(response.status).toEqual(404)
  })

  test('POST / with invalid JSON should return status code 400', async () => {
    const response = await request(app).post('/').send({ firstname: 'Paulo', participation: 150 })
    expect(response.status).toEqual(400)
    expect(response.body.success).toBeFalsy()
    expect(response.body.errors).toBeArray()
    expect(response.body.errors).toStrictEqual(['lastname', 'participation'])
  })

  test('DELETE /invalid-id should return status code 400', async () => {
    const response = await request(app).del('/invalid-id')
    expect(response.status).toEqual(400)
    expect(response.body.success).toBeFalsy()
  })
})

const cleanDB = async () => {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (err) {
      // console.log(err.message)
    }
  }
}
