import {isBusUpdatedWithinPast30Minutes} from '../components/helper'

export function mergeUpdatedBuses(oldBuses, newBuses) {
  return oldBuses.map((oldBus) => {
    const newBus = newBuses.find((bus) => bus.id === oldBus.id)
    return newBus || oldBus
  })
}

export function getVisibleBuses({buses, metroBuses, filter, selectedRoute}) {
  return buses.concat(metroBuses).filter((bus) => {
    const isRecent = !filter || isBusUpdatedWithinPast30Minutes(bus.lastPing)
    return isRecent && selectedRoute.includes(bus.route)
  })
}

export function formatStopName(stopName) {
  return stopName[0].toUpperCase() + stopName.slice(1)
}
