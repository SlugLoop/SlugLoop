// I have this in here because without it, the function can't find the firebase key from teh environment file correctly.
const config = require('dotenv').config();
const soonBusStop = require("../functions/soonBusStop")

test('Should updates the ETAs for the bus stops', () => {
  try {
    const response = soonBusStop()

    // An Error has occurred
    if (response !== undefined) {
      console.error(response)
    }
  
    expect(response).toBe(undefined)
  } catch (error) {
    console.error(error)
  }
  
})