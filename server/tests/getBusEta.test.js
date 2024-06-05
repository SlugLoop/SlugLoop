const request = require("supertest")
const express = require("express")
const path = require("path")

// Mocking the database we created in firebase.js (The one in production)
jest.mock("../initialization/firebase.js", () => {
  const mockGet = jest.fn(() => Promise.resolve({data: jest.fn(() => "Test Data")}))

  return {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: mockGet,
      })),
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
describe("GET /busEta", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Normal Response", async () => {
    const mockFunc = defaultDatabase.collection('busStop').doc("CW").get
    const response = await request(app).get("/busEta")
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({"cw": "Test Data", "ccw": "Test Data"})
    // Two Get Request Sent
    expect(mockFunc).toHaveBeenCalledTimes(2)
  })

  it("Error Response if failed at get", async () => {
    const mockFunc = defaultDatabase.collection('busStop').doc('CW').get
    mockFunc.mockRejectedValueOnce(new Error("Error Catching"))
    const response = await request(app).get("/busEta")
    expect(response.statusCode).toBe(500)
    expect(response.text).toEqual("Error getting etas")
    // One Get Request Sent (Due to Error)
    expect(mockFunc).toHaveBeenCalledTimes(1)
  })
})
