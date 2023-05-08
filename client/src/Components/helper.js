export function headingBetweenPoints({lat1, lon1}, {lat2, lon2}) {
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

const THIRTY_MINUTES = 30 * 60 * 1000
export const isBusUpdatedWithinPast30Minutes = (lastPing) => {
  const currentTime = new Date()
  const lastPingTime = new Date(lastPing)
  const timeDifference = currentTime - lastPingTime
  return timeDifference < THIRTY_MINUTES
}

export const combineBusArrays = (loopBuses, metroBuses) => {}
