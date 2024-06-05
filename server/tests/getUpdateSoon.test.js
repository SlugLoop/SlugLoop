const request = require("supertest")
const express = require("express")
const path = require("path")
let { nextBusStops } = require('../functions/soonBusStop.js')

// Mocking nextBusStops
jest.mock('../functions/soonBusStop.js', () => ({
  nextBusStops: jest.fn(),
}))

const router = require("../routes/index.js")

// Connecting to the routes folder (1.1)
const app = express()

// Set up view engine
app.set("views", path.join(__dirname, "../views")) // Adjust the path to your views folder
app.set("view engine", "ejs") // Use EJS as the view engine (or any other view engine you prefer)

app.use(router)
// End of (1.1)

// Tests
describe("GET /updateSoon", () => {
  beforeEach(() => {
    nextBusStops.mockClear()
    nextBusStops.mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Normal Response", async () => {
    const mockedFunc = nextBusStops
    const response = await request(app).get("/updateSoon")
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe("OK")
    // nextBusStops Called Once
    expect(mockedFunc).toHaveBeenCalledTimes(1)
  })

  it("Error Response", async () => {
    const mockedFunc = nextBusStops
    mockedFunc.mockImplementation(() => {throw new Error("Error Catching")})
    const response = await request(app).get("/updateSoon")
    expect(response.statusCode).toBe(500)
    expect(response.text).toBe("Error updating next stop etas")
    // nextBusStops Called Once
    expect(mockedFunc).toHaveBeenCalledTimes(1)
  })
})
