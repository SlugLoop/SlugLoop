const request = require("supertest")
const express = require("express")
const path = require("path")

// Mocking the database we created in firebase.js (The one in production)
jest.mock("../initialization/firebase.js", () => {
  const admin = require('firebase-admin')

  let mockBus1 = {
    "previousLongitude": 0,
    "route": "string1",
    "previousLocationArray": [
      { "lon": 1, "lat": 1 },
      { "lon": 2, "lat": 2 },
    ],
    "lastLongitude": 1,
    "previousLatitude": 1,
    "heading": "string1",
    "lastPing": new admin.firestore.Timestamp(1714507732, 299000000),
    "id": "string3",
    "fleetId": 1,
    "lastLatitude": 2,
    "direction": "cw",
    "sid": "string4"
  }
  let mockBus2 = {
    "previousLongitude": 2,
    "route": "string1",
    "previousLocationArray": [
      { "lon": 1, "lat": 1 },
      { "lon": 2, "lat": 2 },
    ],
    "lastLongitude": 1,
    "previousLatitude": 1,
    "heading": "string1",
    "lastPing": new admin.firestore.Timestamp(1697687739, 440000000),
    "id": "string5",
    "fleetId": 1,
    "lastLatitude": 2,
    "direction": "cw",
    "sid": "string4"
  }

  const mockData = [{data: jest.fn(() => mockBus1)}, {data: jest.fn(() => mockBus2)}]

  const get = jest.fn(() => Promise.resolve(mockData))


  return {
    collection: jest.fn(() => ({
      get,
    })),
  }
})

let defaultDatabase = require("../initialization/firebase.js")

const router = require("../routes/index.js")

// Connecting to the routes folder (1.1)
const app = express()

// Set up view engine
app.set("views", path.join(__dirname, "../views")) // Adjust the path to your views folder
app.set("view engine", "ejs") // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)
// End of (1.1)

// Tests
describe("GET /buses", () => {
  beforeEach(() => {
    
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Empty Response", async () => {
    // Checks empty response
    const response = await request(app).get("/buses").query({lastUpdated: 0})
    expect(response.statusCode).toBe(200)
    expect(response.text).toMatch("[]")
  })

  it("Normal Response if lastUpdated is NOT defined", async () => {
    const get = defaultDatabase.collection("busses").get
    const response = await request(app).get("/buses").query({lastUpdated: undefined})
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{
      "previousLongitude": 0,
      "route": "string1",
      "previousLocationArray": [
        { "lon": 1, "lat": 1 },
        { "lon": 2, "lat": 2 },
      ],
      "lastLongitude": 1,
      "previousLatitude": 1,
      "heading": "string1",
      "id": "string3",
      "fleetId": 1,
      "lastLatitude": 2,
      "lastPing": "2024-04-30T20:08:52.299Z",
      "direction": "cw",
      "sid": "string4"
    },
    {
      "previousLongitude": 2,
      "route": "string1",
      "previousLocationArray": [
        { "lon": 1, "lat": 1 },
        { "lon": 2, "lat": 2 },
      ],
      "lastLongitude": 1,
      "previousLatitude": 1,
      "heading": "string1",
      "id": "string5",
      "fleetId": 1,
      "lastLatitude": 2,
      "lastPing": "2023-10-19T03:55:39.440Z",
      "direction": "cw",
      "sid": "string4"
    }])
    // One Get Request Sent
    expect(get).toHaveBeenCalledTimes(1)
  })

  it("Normal Response if lastUpdated is defined", async () => {
    // Note, Only mockBus1 should be the return data as mockBus2 gets filtered out
    const get = defaultDatabase.collection("busses").get
    const response = await request(app).get("/buses").query({lastUpdated: 2370000})
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{
      "previousLongitude": 0,
      "route": "string1",
      "previousLocationArray": [
        { "lon": 1, "lat": 1 },
        { "lon": 2, "lat": 2 },
      ],
      "lastLongitude": 1,
      "previousLatitude": 1,
      "heading": "string1",
      "id": "string3",
      "fleetId": 1,
      "lastLatitude": 2,
      "lastPing": "2024-04-30T20:08:52.299Z",
      "direction": "cw",
      "sid": "string4"
    }])
    // One Get Request Sent
    expect(get).toHaveBeenCalledTimes(1)
  })
})
