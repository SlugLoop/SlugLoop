const admin = require('firebase-admin')
const supertest = require('supertest')
require('dotenv').config()
const nextBusStops = require('../routes/direction.js')
const busStops = require('../routes/bus-stops.json')
const calcCWorCCW = require('../routes/direction.js')
const defaultDatabase = require('../routes/firebase.js')

jest.mock('firebase-admin', () => {
  const fireAdmin = {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        get: jest.fn(),
        doc: jest.fn(() => ({
          update: jest.fn(),
        })),
      })),
    })),
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
  }
  return fireAdmin
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('nextBusStops', () => {
  it('should update the bus stops correctly', async () => {
    const mockData = [
      {
        lastLatitude: 0.1,
        lastLongitude: 0.1,
        previousLocationArray: ['0.09', '0.09'],
      },
      // Add more mock bus data here if needed
    ]
    admin
      .firestore()
      .collection()
      .get.mockResolvedValue({
        forEach: (callback) =>
          mockData.forEach((data) =>
            callback({
              data: () => data,
            }),
          ),
      })
    await nextBusStops()

    expect(admin.firestore().collection().doc().update).toHaveBeenCalled()
  })
})
