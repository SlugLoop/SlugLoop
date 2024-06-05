const request = require("supertest")
const express = require("express")
const path = require("path")

// Mocking the database we created in firebase.js (The one in production)
jest.mock("../initialization/firebase.js", () => {
  const admin = require('firebase-admin')

  let mockBus1 = {
    "previousLongitude": 0,
    "route": "1",
    "previousLocationArray": [
      { "lon": 1, "lat": 1 },
      { "lon": 2, "lat": 2 },
    ],
    "lastLongitude": 1,
    "previousLatitude": 1,
    "heading": "180",
    "lastPing": new admin.firestore.Timestamp(1714507732, 299000000),
    "id": "1",
    "fleetId": 1,
    "lastLatitude": 2,
    "direction": "cw",
    "sid": "string4"
  }

  const mockData = {data: jest.fn(() => mockBus1), exists: true}

  const mockedGet = jest.fn(() => Promise.resolve(mockData))
  const mockedSet = jest.fn(() => {})

  return {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: mockedGet,
        set: mockedSet,
      })),
    })),
  }
})

jest.mock("../functions/pingHelper.js", () => {
  return {
    headingBetweenPoints: jest.fn(() => 180),
    getDistanceFromLatLonInMeters: jest.fn(() => 35)
  }
})

jest.mock("../functions/direction.js", () => {
  return {
    calcCWorCCW: jest.fn(() => "cw")
  }
})

let defaultDatabase = require("../initialization/firebase.js")
let {headingBetweenPoints, getDistanceFromLatLonInMeters} = require("../functions/pingHelper")
let {calcCWorCCW} = require("../functions/direction.js")

const router = require("../routes/index.js")

// Connecting to the routes folder (1.1)
const app = express()

// Set up view engine
app.set("views", path.join(__dirname, "../views")) // Adjust the path to your views folder
app.set("view engine", "ejs") // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)
// End of (1.1)

// Tests
describe("POST /ping", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Tests Data Validation & Err Response in case of validation fail
  it("Error Response - Data Validation failed", async () => {
    // Missing sid
    const responseNoSid = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"id":"1","lon":1,"lat":1,"route":"1", "key":"testKey"}]'})
    expect(responseNoSid.statusCode).toBe(400)
    expect(responseNoSid.text).toBe("Invalid data")
    // Missing sid
    const responseNoID = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","lon":1,"lat":1,"route":"1", "key":"testKey"}]'})
    expect(responseNoID.statusCode).toBe(400)
    expect(responseNoID.text).toBe("Invalid data")
    // Missing lon
    const responseNoLon = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","id":"1","lat":1,"route":"1", "key":"testKey"}]'})
    expect(responseNoLon.statusCode).toBe(400)
    expect(responseNoLon.text).toBe("Invalid data")
    // Missing lat
    const responseNoLat = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","id":"1","lon":1,"route":"1", "key":"testKey"}]'})
    expect(responseNoLat.statusCode).toBe(400)
    expect(responseNoLat.text).toBe("Invalid data")
    // Missing route
    const responseNoRoute = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","id":"1","lon":1,"lat":1, "key":"testKey"}]'})
    expect(responseNoRoute.statusCode).toBe(400)
    // No Key
    const responseNoKey = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","id":"1","lon":1,"lat":1,"route":"1"}]'})
    expect(responseNoKey.statusCode).toBe(400)
    expect(responseNoKey.text).toBe("Invalid data")
    // Extra Params
    const response = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","id":"1","lon":1,"lat":1,"route":"1", "key":"testKey", "extraParam": "test"}]'})
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe("Invalid data")
  })

  it("Error Response - Unauthorizeed", async () => {
    // Invalid Key
    const response = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: '[{"sid":"1","id":"1","lon":1,"lat":1,"route":"1", "key":"testKey"}]'})
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe("Unauthorized")
  })

  it("Normal Response - OK", async () => {
    const mockFuncGet = defaultDatabase.collection('busses').doc().get
    const mockFuncSet = defaultDatabase.collection('busses').doc().set
    // Normal Res
    const response = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: `[{"sid":"1","id":"1","lon":1,"lat":1,"route":"1", "key":"${process.env.PING_KEY}"}]`})
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe("OK")
    // Two Get Request Sent (One is for debugging)
    expect(mockFuncGet).toHaveBeenCalledTimes(2)
    // One Set Request Sent
    expect(mockFuncSet).toHaveBeenCalledTimes(2)
    // Basically everything it's called with except Timestamp
    expect(mockFuncSet.mock.calls[0][0]["direction"]).toBe("cw")
    expect(mockFuncSet.mock.calls[0][0]["fleetId"]).toBe(1)
    expect(mockFuncSet.mock.calls[0][0]["heading"]).toBe("180")
    expect(mockFuncSet.mock.calls[0][0]["id"]).toBe("1")
    expect(mockFuncSet.mock.calls[0][0]["lastLatitude"]).toBe(1)
    expect(mockFuncSet.mock.calls[0][0]["lastLongitude"]).toBe(1)
    expect(mockFuncSet.mock.calls[0][0]["previousLatitude"]).toBe(1)
    expect(mockFuncSet.mock.calls[0][0]["previousLocationArray"]).toEqual([
      {"lat": 1, "lon": 1,}, {"lat": 2, "lon": 2,}, {"lat": 1, "lon": 1,},])
    expect(mockFuncSet.mock.calls[0][0]["previousLongitude"]).toBe(0)
    expect(mockFuncSet.mock.calls[0][0]["route"]).toBe("1")
    expect(mockFuncSet.mock.calls[0][0]["sid"]).toBe("1")
  })

  it("Error Response - Failed Get", async () => {
    const mockFuncGet = defaultDatabase.collection('busses').doc().get
    mockFuncGet.mockImplementation(() => {throw new Error("Error Catching")})
    // Normal Res
    const response = await request(app).post("/ping").set("Content-Type", "application/x-www-form-urlencoded")
    .send({data: `[{"sid":"1","id":"1","lon":1,"lat":1,"route":"1", "key":"${process.env.PING_KEY}"}]`})
    expect(response.statusCode).toBe(500)
    expect(response.text).toBe("Error updating documents")
    // One Get Request Sent 
    expect(mockFuncGet).toHaveBeenCalledTimes(1)
  })
})
