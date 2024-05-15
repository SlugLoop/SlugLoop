const calcCWorCCW = require("../functions/direction")

test('Should calculate the direction of a bus based on its current location and previous locations', () => {
  const shouldCWusingLatHelper = calcCWorCCW({lat1: 36.98, lon1: -122.055831}, [
      {
        "lon": -122.05961167,
        "lat": 36.99989667
      },
      {
        "lon": -121.05961167,
        "lat": 35.99989667
      }
  ])

  const shouldCCWusingLatHelper = calcCWorCCW({lat1: 36.98, lon1: -122.055831}, [
    {
      "lon": -122.05961167,
      "lat": 36.99989667
    },
    {
      "lon": -121.05961167,
      "lat": 37.99989667
    }
  ])

  const shouldCWusingLonHelper = calcCWorCCW({lat1: 36.9925, lon1: -122.065}, [
    {
      "lon": -122.05961167,
      "lat": 36.99989667
    },
    {
      "lon": -121.05961167,
      "lat": 35.99989667
    }
  ])

  const shouldCCWusingLonHelper = calcCWorCCW({lat1: 36.9925, lon1: -122.065}, [
    {
      "lon": -121.05961167,
      "lat": 36.99989667
    },
    {
      "lon": -122.05961167,
      "lat": 35.99989667
    }
  ])

  expect(shouldCCWusingLatHelper).toBe("ccw")
  expect(shouldCWusingLatHelper).toBe("cw")
  expect(shouldCCWusingLonHelper).toBe("ccw")
  expect(shouldCWusingLonHelper).toBe("cw")
})
