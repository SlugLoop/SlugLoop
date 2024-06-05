const request = require("supertest")
const express = require("express")
const path = require("path")

// Mocking the database we created in firebase.js (The one in production)
jest.mock("../initialization/firebase.js", () => {
  const mockAdd = jest.fn()

  return {
    collection: jest.fn(() => ({
      add: mockAdd,
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

// {"header": {"access-control-allow-origin": "*", "connection": "close", "content-length": "2", "content-type":
//  "text/html; charset=utf-8", "date": "Wed, 05 Jun 2024 00:36:55 GMT", "etag": 
// "W/\"2-nOO9QiTIwXgNtWtBJezz8kv3SLc\"", "x-powered-by": "Express"}, 

// "req": {"data": {"email": "Test@email.com", "message": "TestMessage", "name": "TestName"}, 

// "headers": {"content-type": "application/json"}, "method": "POST", "url": "http://127.0.0.1:64146/contact"}, "status": 200, "text": "OK"}


// Tests
describe("POST /contact", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Normal Response", async () => {
    const mockFunc = defaultDatabase.collection('responses').add
    const response = await request(app).post("/contact").send({name: "TestName", email: "Test@email.com", message: "TestMessage"})
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe("OK")
    // One Get Request Sent
    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc.mock.calls[0]).toEqual([{email: "Test@email.com", message: "TestMessage", name: "TestName"}])
  })

  it("Error Response", async () => {
    const mockFunc = defaultDatabase.collection('responses').add
    mockFunc.mockImplementation(() => {throw new Error("Error Catching")})
    const response = await request(app).post("/contact").send({name: "TestName", email: "Test@email.com", message: "TestMessage"})
    expect(response.statusCode).toBe(500)
    expect(response.text).toBe("Error sending message")
    // One Get Request Sent
    expect(mockFunc).toHaveBeenCalledTimes(1)
  })
})
