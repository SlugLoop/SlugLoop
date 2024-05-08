
const soonBusStop = require("../functions/soonBusStop")

test('Should updates the ETAs for the bus stops', () => {
  const response = soonBusStop()

  // An Error has occurred
  if (response !== undefined) {
    console.error(response)
  }

  expect(response).toBe(undefined)
})