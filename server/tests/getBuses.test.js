const request = require('supertest')
const express = require('express')
const path = require('path')
const router = require('../routes')

const app = express()

// Set up view engine
app.set('views', path.join(__dirname, '../views')) // Adjust the path to your views folder
app.set('view engine', 'ejs') // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)

test('Should get the buses from firebase', async () => {
  // Checks empty response
  const emptyResponse = await request(app).get('/buses').query({lastUpdated: 0})
  expect(emptyResponse.statusCode).toBe(200)
  expect(emptyResponse.text).toMatch("[]")

  // Check normal reponse
  const response = await request(app).get('/buses')

  if (response.statusCode !== 200) {
    expect(response.statusCode).toBe(500)
    expect(response.headers).toMatch(/html/)
    // expect(response.body).toBe("Error getting documents")
    console.error(response.text)
  }

  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toMatch("application/json")

  // const response2 = await request(app).get('/buses')
})