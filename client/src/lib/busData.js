import {collection, getDocs, query, Timestamp, where} from 'firebase/firestore'
import {database} from './firebase'

const THIRTY_MINUTES_IN_MS = 30 * 60 * 1000
const isTestMode = process.env.NEXT_PUBLIC_SLUGLOOP_TEST_MODE === '1'

function docsToData(snapshot) {
  const records = []
  snapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records
}

function recentQuery(collectionName) {
  const currentTimestamp = Timestamp.now()
  const thirtyMinutesAgo = Timestamp.fromMillis(
    currentTimestamp.toMillis() - THIRTY_MINUTES_IN_MS,
  )

  return query(
    collection(database, collectionName),
    where('lastPing', '>=', thirtyMinutesAgo),
  )
}

export async function getAllBuses() {
  if (isTestMode) return []
  return docsToData(await getDocs(collection(database, 'busses')))
}

export async function getUpdatedBuses() {
  if (isTestMode) return []
  return docsToData(await getDocs(recentQuery('busses')))
}

export async function getAllMetroBuses() {
  if (isTestMode) return []
  return docsToData(await getDocs(collection(database, 'metro')))
}

export async function getUpdatedMetroBuses() {
  if (isTestMode) return []
  return docsToData(await getDocs(recentQuery('metro')))
}

export async function getBusEtas() {
  if (isTestMode) return {cw: {}, ccw: {}}
  let cw = {}
  let ccw = {}
  const snapshot = await getDocs(collection(database, 'busStop'))

  snapshot.forEach((doc) => {
    if (doc.id === 'CW') {
      cw = doc.data()
    } else {
      ccw = doc.data()
    }
  })

  return {cw, ccw}
}
