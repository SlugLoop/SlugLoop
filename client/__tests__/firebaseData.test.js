import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import {getAllBuses, getBusEtas, getUpdatedBuses} from '../src/lib/busData'

jest.mock('../src/lib/firebase', () => ({
  database: {name: 'mock-db'},
}))

jest.mock('firebase/firestore', () => ({
  collection: jest.fn((database, name) => ({database, name})),
  getDocs: jest.fn(),
  query: jest.fn((collectionRef, ...clauses) => ({collectionRef, clauses})),
  where: jest.fn((field, operator, value) => ({field, operator, value})),
  Timestamp: {
    now: jest.fn(() => ({toMillis: () => 1_800_000})),
    fromMillis: jest.fn((value) => ({millis: value})),
  },
}))

function snapshotFromDocs(docs) {
  return {
    forEach(callback) {
      docs.forEach((doc) => callback(doc))
    },
  }
}

beforeEach(() => {
  jest.clearAllMocks()
})

test('reads all loop buses from the busses collection', async () => {
  getDocs.mockResolvedValue(
    snapshotFromDocs([{data: () => ({id: 'loop-1', route: 'LOOP'})}]),
  )

  await expect(getAllBuses()).resolves.toEqual([{id: 'loop-1', route: 'LOOP'}])
  expect(collection).toHaveBeenCalledWith({name: 'mock-db'}, 'busses')
})

test('queries recently updated loop buses by lastPing', async () => {
  getDocs.mockResolvedValue(snapshotFromDocs([]))

  await getUpdatedBuses()

  expect(Timestamp.fromMillis).toHaveBeenCalledWith(0)
  expect(where).toHaveBeenCalledWith('lastPing', '>=', {millis: 0})
  expect(query).toHaveBeenCalledWith(
    {database: {name: 'mock-db'}, name: 'busses'},
    {field: 'lastPing', operator: '>=', value: {millis: 0}},
  )
})

test('splits stop ETA documents into clockwise and counter-clockwise maps', async () => {
  getDocs.mockResolvedValue(
    snapshotFromDocs([
      {id: 'CW', data: () => ({quarry: 60})},
      {id: 'CCW', data: () => ({cowell: 120})},
    ]),
  )

  await expect(getBusEtas()).resolves.toEqual({
    cw: {quarry: 60},
    ccw: {cowell: 120},
  })
})
