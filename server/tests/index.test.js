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

// Reset all mock function call counts and return values before each test
beforeEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
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

describe('GET /buses last updated 0', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/buses?lastUpdated=0').expect(200, done)
  })
})

describe('GET /buses last updated 0', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/buses?lastUpdated=10000000').expect(200, done)
  })
})

describe('GET /buses failure', () => {
  it('should return 200 OK', (done) => {
    const defaultDatabase = require('../routes/firebase.js') // Local import inside the test
    defaultDatabase.collection = jest.fn().mockReturnValue({
      get: jest.fn().mockRejectedValue(new Error('Firebase error')),
    })

    // Re-import the router to ensure it picks up the defaultDatabase mock.
    // Provided the 'defaultDatabase' import in your router module is not
    // inside a function block or IIFE, this should pick up the mock appropriately.
    const router = require('../routes')

    // Create a new express app for testing
    const app = express()
    app.set('view engine', 'ejs')
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(router)

    request(app).get('/buses').expect(500, done)
  })
})

describe('POST /ping', () => {
  it('should return 200 OK if valid data is provided', (done) => {
    const data = JSON.stringify([
      {
        sid: '5',
        id: '84',
        lon: 100,
        lat: 100,
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

  it('branch test: should return 200 OK if valid data is provided', (done) => {
    const data = JSON.stringify([
      {
        sid: '5',
        id: '5',
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

  it('Should return 200, but distance is larger', (done) => {
    //TODO: Got to check the previous location array was set
    const data = JSON.stringify([
      {
        sid: '5',
        id: '1',
        lon: 10,
        lat: 10,
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

  it('Unauthorized Test', (done) => {
    const data = JSON.stringify([
      {
        sid: '1',
        id: '1',
        lon: 1,
        lat: 1,
        route: '1',
        key: 'test',
      },
    ])

    request(app)
      .post('/ping')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`data=${encodeURIComponent(data)}`)
      .expect(401, done)
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

    request(app).post('/contact').send(data).expect(400, done)
  })

  it('should return 500 if firebase error', (done) => {
    const defaultDatabase = require('../routes/firebase.js') // Local import inside the test
    defaultDatabase.collection = jest.fn().mockReturnValue({
      add: jest.fn().mockRejectedValue(new Error('Firebase error')),
    })

    // Re-import the router to ensure it picks up the defaultDatabase mock.
    // Provided the 'defaultDatabase' import in your router module is not
    // inside a function block or IIFE, this should pick up the mock appropriately.
    const router = require('../routes')

    // Create a new express app for testing
    const app = express()
    app.set('view engine', 'ejs')
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(router)

    const data = {
      name: 'test',
      email: 'test@test.com',
      message: 'test message',
    }
    request(app).post('/contact').send(data).expect(500, done)
  })
})

describe('POST /updateSoon test', () => {
  it('should return 200 OK', (done) => {
    request(app).post('/updateSoon').expect(200, done)
  })
})
