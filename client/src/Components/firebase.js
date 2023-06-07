import {database} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'

// Gets all busses from the database
export async function getAllBuses() {
  const busRef = collection(database, 'busses')
  const snapshot = await getDocs(busRef)
  const busses = []
  snapshot.forEach((doc) => {
    busses.push(doc.data())
  })
  return busses
}

// Gets all metro buses from the database
export async function getAllMetroBuses() {
  const metroRef = collection(database, 'metro')
  const snapshot = await getDocs(metroRef)
  const busses = []
  snapshot.forEach((doc) => {
    busses.push(doc.data())
  })
  return busses
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