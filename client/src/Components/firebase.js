import {database} from '../firebase'
import {collection, getDocs, query, where, Timestamp} from 'firebase/firestore'

// Define the 30 minutes time interval in milliseconds
const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000

// Gets all loop buses from the database
export async function getAllBuses() {
  const busRef = collection(database, 'busses')
  const snapshot = await getDocs(busRef)
  const buses = []
  snapshot.forEach((doc) => {
    buses.push(doc.data())
  })
  return buses
}

// Gets all loop buses that have been updated in the past 30 minutes from the database
export async function getUpdatedBuses() {
  const currentTimestamp = Timestamp.now()
  const thirtyMinutesAgo = Timestamp.fromMillis(
    currentTimestamp.toMillis() - THIRTY_MINUTES_IN_MS,
  )
  const busQuery = query(
    collection(database, 'busses'),
    where('lastPing', '>=', thirtyMinutesAgo),
  )
  const snapshot = await getDocs(busQuery)
  const buses = []
  snapshot.forEach((doc) => {
    buses.push(doc.data())
  })
  return buses
}

// Gets all metro buses from the database
export async function getAllMetroBuses() {
  const metroRef = collection(database, 'metro')
  const snapshot = await getDocs(metroRef)
  const buses = []
  snapshot.forEach((doc) => {
    buses.push(doc.data())
  })
  return buses
}

// Gets all metro buses that have been updated in the past 30 minutes from the database
export async function getUpdatedMetroBuses() {
  const currentTimestamp = Timestamp.now()
  const thirtyMinutesAgo = Timestamp.fromMillis(
    currentTimestamp.toMillis() - THIRTY_MINUTES_IN_MS,
  )
  const metroQuery = query(
    collection(database, 'metro'),
    where('lastPing', '>=', thirtyMinutesAgo),
  )
  const snapshot = await getDocs(metroQuery)
  const buses = []
  snapshot.forEach((doc) => {
    buses.push(doc.data())
  })
  return buses
}

export async function getSoonBusStops() {
  const stopsRef = collection(database, 'busStop')
  const snapshot = await getDocs(stopsRef)
  const stops = []
  snapshot.forEach((doc) => {
    stops.push(doc.data())
  })
  return stops
}