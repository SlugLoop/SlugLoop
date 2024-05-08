const request = require('supertest')
const express = require('express')
const path = require('path')
const router = require('../routes')

const app = express()

// Set up view engine
app.set('views', path.join(__dirname, '../views')) // Adjust the path to your views folder
app.set('view engine', 'ejs') // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)

test('Should Get the latest ping location of Buses', async () => {
  const response = await request(app).post('/ping')

  // These are errors but handled correctly - Will still show up as failed tests as they aren't expected values
  if (response.statusCode === 400) {
    expect(response.text).toBe("Invalid data")
    console.error(response.text)
  }

  if (response.statusCode === 401) {
    expect(response.text).toBe("Unauthorized")
    console.error(response.text)
  }

  expect(response.statusCode).toBe(200)
  expect(response.text).toBe("OK")
})