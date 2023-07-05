const request = require('supertest')
const express = require('express')
const path = require('path')
const router = require('../routes')
const nock = require('nock')

const app = express()

// Set up view engine
app.set('views', path.join(__dirname, '../views')) // Adjust the path to your views folder
app.set('view engine', 'ejs') // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
})
describe('Metro Buses Tests', () => {
  test('should return a list of metro buses', async () => {
    const mockResponse = {
      'bustime-response': {
        vehicle: [
          {
            vid: 'bus1',
            rt: '10',
            lat: '40.712776',
            lon: '-74.005974',
            tmstmp: '202307011230',
            hdg: 'north',
            psgld: '50',
          },
        ],
      },
    }

    nock(`${process.env.METRO_URL}`)
      .get('/getvehicles')
      .query(true) // match any query params
      .reply(200, mockResponse)

    const response = await request(app).get('/metroBuses')

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  test('should return an empty list when there is an error', async () => {
    const mockResponse2 = {
      'bustime-response': {
        error: [],
      },
    }

    nock(`${process.env.METRO_URL}`)
      .get('/getvehicles')
      .query(true) // match any query params
      .reply(200, mockResponse2)

    const response2 = await request(app).get('/metroBuses')

    expect(response2.statusCode).toBe(200)
    expect(Array.isArray(response2.body)).toBe(true)
  })

  test('should return a status of 200 when updating metro buses', async () => {
    const mockResponse = {
      'bustime-response': {
        vehicle: [
          {
            vid: 'bus1',
            rt: '10',
            lat: '40.712776',
            lon: '-74.005974',
            tmstmp: '20200308 10:28',
            hdg: 'north',
            psgld: '50',
          },
        ],
      },
    }

    nock(`${process.env.METRO_URL}`)
      .get('/getvehicles')
      .query(true) // match any query params
      .reply(200, mockResponse)

    const response = await request(app).put('/updateMetroBuses')

    expect(response.statusCode).toBe(200)
  })

  test('should return a status of 429 when rate limit is reached', async () => {
    const mockResponse2 = {
      'bustime-response': {
        error: [],
      },
    }

    nock(`${process.env.METRO_URL}`)
      .get('/getvehicles')
      .query(true) // match any query params
      .reply(200, mockResponse2)

    const response2 = await request(app).put('/updateMetroBuses')

    expect(response2.statusCode).toBe(429)
  })

  test('should return a status of 200 when updating metro buses after waiting', async () => {
    const mockResponse3 = {}

    nock(`${process.env.METRO_URL}`)
      .get('/getvehicles')
      .query(true) // match any query params
      .reply(200, mockResponse3)

    await new Promise((resolve) => setTimeout(resolve, 10000))

    const response3 = await request(app).put('/updateMetroBuses')

    expect(response3.statusCode).toBe(200)
  })

  test('should return a status of 500 when there is an error updating buses', async () => {
    const mockResponse4 = {}

    nock(`${process.env.METRO_URL}`)
      .get('/getvehicles')
      .query(true) // match any query params
      .reply(500, mockResponse4)

    await new Promise((resolve) => setTimeout(resolve, 10000))

    const response4 = await request(app).put('/updateMetroBuses')

    expect(response4.statusCode).toBe(500)
  })
})
