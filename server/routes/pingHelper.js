/*
This utility script provides functions to calculate the heading (bearing) between two geographical points and the distance between them, given their latitude and longitude coordinates.
*/
function headingBetweenPoints({lat1, lon1}, {lat2, lon2}) {
  const toRad = (deg) => (deg * Math.PI) / 180 // convert degrees to radians

  // Y variable
  const dLong = toRad(lon2 - lon1)
  const Y = Math.sin(dLong) * Math.cos(toRad(lat2))

  // X variable
  const X =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLong)

  // Calculate bearing
  const bearing = (toRad(360) + Math.atan2(Y, X)) % toRad(360)
  // Convert to degrees
  return (bearing * 180) / Math.PI + 180
}

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d * 1000 // Distance in meters
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

module.exports = {
  headingBetweenPoints,
  getDistanceFromLatLonInMeters,
}
