const calcCWorCCW = require('../routes/direction.js') // Please replace with your actual file name

describe('Testing calcCWorCCW function', () => {
  test('Test for Lower West Half where latitude is decreasing', () => {
    const location = {
      lat1: 36.98,
      lon1: -122.06,
    }
    const previousLocationArray = [
      {lat: 36.99, lon: -122.06},
      {lat: 36.989, lon: -122.06},
      {lat: 36.988, lon: -122.06},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('ccw')
  })

  test('Test for Lower West Half where latitude is increasing', () => {
    const location = {lat1: 36.979, lon1: -122.06}
    const previousLocationArray = [
      {lat: 36.977, lon: -122.06},
      {lat: 36.978, lon: -122.06},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('cw')
  })

  test('Test for Lower East Half where latitude is decreasing', () => {
    const location = {lat1: 36.978, lon1: -122.05}
    const previousLocationArray = [
      {lat: 36.979, lon: -122.05},
      {lat: 36.9789, lon: -122.05},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('cw')
  })

  test('Test for Lower East Half where latitude is increasing', () => {
    const location = {lat1: 36.978, lon1: -122.05}
    const previousLocationArray = [
      {lat: 36.977, lon: -122.05},
      {lat: 36.978, lon: -122.05},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('ccw')
  })

  test('Test for RCC Area where longitude is increasing', () => {
    const location = {lat1: 36.993, lon1: -122.062}
    const previousLocationArray = [
      {lat: 36.993, lon: -122.064},
      {lat: 36.993, lon: -122.063},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('cw')
  })

  test('Test for RCC to Kresge where latitude is decreasing', () => {
    const location = {lat1: 36.994, lon1: -122.063}
    const previousLocationArray = [
      {lat: 36.995, lon: -122.063},
      {lat: 36.994, lon: -122.063},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('ccw')
  })

  test('Test for RCC to Kresge where latitude is increasing', () => {
    const location = {lat1: 36.994, lon1: -122.063}
    const previousLocationArray = [
      {lat: 36.993, lon: -122.063},
      {lat: 36.994, lon: -122.063},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('cw')
  })

  test('Test for Baskin to Crown where longitude is increasing', () => {
    const location = {lat1: 37.0, lon1: -122.064}
    const previousLocationArray = [
      {lat: 37.0, lon: -122.065},
      {lat: 37.0, lon: -122.064},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('cw')
  })

  test('Test for East Remote to Crown where latitude is increasing', () => {
    const location = {lat1: 36.9935, lon1: -122.055}
    const previousLocationArray = [
      {lat: 36.992, lon: -122.056},
      {lat: 36.993, lon: -122.056},
      {lat: 36.9935, lon: -122.055},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('ccw')
  })

  test('Test for Bay and High Area (West Side) where longitude is increasing', () => {
    const location = {lat1: 36.9772, lon1: -122.054}
    const previousLocationArray = [
      {lat: 36.9772, lon: -122.055},
      {lat: 36.9772, lon: -122.054},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('ccw')
  })

  test('Test for Bay and High Area (East Side) where latitude is decreasing', () => {
    const location = {
      lat1: 36.9774,
      lon1: -122.053,
    }
    const previousLocationArray = [
      {lat: 36.9775, lon: -122.053},
      {lat: 36.9774, lon: -122.053},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('cw')
  })

  // Test when the location does not match any known areas
  test('Test when the location does not match any known areas', () => {
    const location = {
      lat1: 37.0, // latitude that does not fall into any defined areas
      lon1: -122.0, // longitude that does not fall into any defined areas
    }
    const previousLocationArray = [
      {lat: 37.0, lon: -122.0},
      {lat: 37.0, lon: -122.0},
    ]
    const output = calcCWorCCW(location, previousLocationArray)
    expect(output).toBe('n/a')
  })
})
