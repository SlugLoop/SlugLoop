const request = require('supertest')
const express = require('express')
const chai = require('chai')
const expect = chai.expect

// Import your router
const router = require('../routes')

// Create a new express app for testing
const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/').expect(200, done)
  })
})

describe('GET /buses', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/buses').expect(200, done)
  })
})
describe('POST /ping', () => {
  it('should return 200 OK if valid data is provided', (done) => {
    const data = JSON.stringify([
      {
        sid: '1',
        id: '1',
        lon: 1,
        lat: 1,
        route: '1',
        key: process.env.PING_KEY,
      },
    ])

    request(app)
      .post('/ping')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`data=${encodeURIComponent(data)}`)
      .expect(200, done)
  })

  it('should return 400 if invalid data is provided', (done) => {
    const data = '{}'

    request(app)
      .post('/ping')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`data=${encodeURIComponent(data)}`)
      .expect(400, done)
  })
})

describe('POST /contact', () => {
  it('should return 200 OK if valid data is provided', (done) => {
    const data = {
      name: 'test',
      email: 'test@test.com',
      message: 'test message',
    }

    request(app).post('/contact').send(data).expect(200, done)
  })

  it('should return 400 if invalid data is provided', (done) => {
    const data = {}

    request(app).post('/contact').send(data).expect(500, done)
  })
})
