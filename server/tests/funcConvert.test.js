
const convert = require("../functions/convert")

test('Should updates the lastPing field in all documents within the metro collection', () => {
  const response = convert()

  // An Error has occurred
  if (response !== undefined) {
    console.error(response)
  }

  expect(response).toBe(undefined)
})