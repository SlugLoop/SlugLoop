const request = require("supertest")
const express = require("express")
const path = require("path")
let {
  areListsEqual,
  nextBusStops,
  closestBusStop,
} = require("../functions/soonBusStop.js")

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

jest.mock('../functions/pingHelper.js', () => ({
  getDistanceFromLatLonInMeters: jest.fn(() => {return 500}),
}))

let defaultDatabase = require("../initialization/firebase.js")

// Tests
describe("Tests all functions in soonBusStop.js", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Are Lists Equal Function", async () => {
    expect(areListsEqual(["1", 2, {a: "2"}, null], ["1", 2, {a: "2"}, null])).toBe(true)
    expect(areListsEqual(["1", {a: "2"}, null], ["1", 2, {a: "2"}, null])).toBe(false)
    expect(areListsEqual([], [])).toBe(true)
    expect(areListsEqual(["1", 2, {a: "2"}, null], ["1", 2, {b: "2"}, null])).toBe(false)
  })

  it("Closest Bus Stops", async () => {

  })
})
