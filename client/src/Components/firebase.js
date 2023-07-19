import {database} from '../firebase'
import {collection, getDocs, query, where, Timestamp} from 'firebase/firestore'

// Gets all buses from the database
export async function getAllBuses() {
  const busRef = collection(database, 'busses')
  const snapshot = await getDocs(busRef)
  const buses = []
  snapshot.forEach((doc) => {
    buses.push(doc.data())
  })
  return buses
}

// Gets all buses that have been updated in the past 30 minutes from the database
export async function getUpdatedBuses() {
  const currentTimestamp = Timestamp.now()
  const THIRTY_MINUTES = new Timestamp(30 * 60, 0)
  const busQuery = query(collection(database, 'busses'), where("lastPing", ">=", currentTimestamp - THIRTY_MINUTES))
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
