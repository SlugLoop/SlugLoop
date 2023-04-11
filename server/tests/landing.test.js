const request = require('supertest')
const express = require('express')
const path = require('path')
const router = require('../routes')

const app = express()

// Set up view engine
app.set('views', path.join(__dirname, '../views')) // Adjust the path to your views folder
app.set('view engine', 'ejs') // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)

test('should render the index view', async () => {
  const response = await request(app).get('/')

  if (response.statusCode !== 200) {
    console.error(response.text)
  }

  expect(response.statusCode).toBe(200)
  expect(response.headers['content-type']).toMatch(/html/)
})
