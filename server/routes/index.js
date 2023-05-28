const express = require('express')
const router = express.Router()
const metro = require('./metro')
require('dotenv').config()
import { calcCWorCCW } from "./direction.js"
import { nextBusStops } from "./soonBusStop.js"

// Helper functions
const {
  headingBetweenPoints,
  getDistanceFromLatLonInMeters,
} = require('./pingHelper')

// Documentation
const OpenApiValidator = require('express-openapi-validator')
const swaggerUi = require('swagger-ui-express')
const apiDoc = require('./api-doc')
const defaultDatabase = require('./firebase.js')

// Middleware
// Add cors
var cors = require('cors')
router.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// Add body parser
router.use(express.json())

// Add documentation
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc))
router.use(
  OpenApiValidator.middleware({
    apiSpec: apiDoc,
    validateRequests: true,
  }),
)

router.use('/', metro)

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/buses', function (req, res) {
  if (req.query.lastUpdated === 0) {
    res.status(200).send([])
    return
  }
  let bussesRef = defaultDatabase.collection('busses')
  bussesRef
    .get()
    .then((snapshot) => {
      let busses = []
      snapshot.forEach((doc) => {
        // Check if there is a lastUpdated query parameter
        if (req.query.lastUpdated) {
          // Calculate the distance between the current time and the last ping
          const diff = Date.now() / 1000 - new Date(doc.data().lastPing) / 1000
          if (diff < parseInt(req.query.lastUpdated)) {
            busses.push(doc.data())
          }
        } else {
          busses.push(doc.data())
        }
      })
      res.status(200).send(busses)
    })
    .catch((err) => {
      console.log('Error getting documents', err)
      res.status(500).send('Error getting documents')
    })
})

/* Ping the server from base stations. */
router.post('/ping', function (req, res) {
  let data = JSON.parse(req.body.data)
  data = data[0]

  // Check if the data is valid and check data length is 6
  if (dataValidate(data)) {
    res.status(400).send('Invalid data')
    return
  }

  if (data.key !== process.env.PING_KEY) {
    res.status(401).send('Unauthorized')
    return
  }

  // Get a database reference to the collection of busses
  let bussesRef = defaultDatabase.collection('busses')

  // Get the database reference to the bus with the given ID
  let busRef = bussesRef.doc(data.id)

  if (data.sid === undefined) {
    data.sid = 'No SID'
  }

  let lastLong = 0 // Current longitude
  let lastLat = 0 // Current latitude
  let previousLocationArray = []

  // Get the last ping location of the bus
  busRef.get().then((doc) => {
    if (doc.exists) {
      // If the bus exists, we will get the last ping location
      lastLong = doc.data().lastLongitude
      lastLat = doc.data().lastLatitude
      // Fetching the previousLocationArray from the database, if it exists
      previousLocationArray = doc.data().previousLocationArray || []
    }

    // Calculate heading
    const currLocation = {lat1: data.lat, lon1: data.lon}
    const prevLocation = {lat2: lastLat, lon2: lastLong}
    const heading = headingBetweenPoints(currLocation, prevLocation)

    // Calculate the distance between the current and the last locations
    const distance = getDistanceFromLatLonInMeters(
      lastLat,
      lastLong,
      data.lat,
      data.lon,
    )
    if (distance > 30.48) {
      // Check if the distance is greater than 100ft (~30.48m)
      // Append the current location to the previousLocationArray
      previousLocationArray.push({lat: data.lat, lon: data.lon})
      previousLocationArray = previousLocationArray.slice(-5)
    }

    // Calculate direction
    const direction = calcCWorCCW(currLocation, previousLocationArray)

    // Update database for which bus stops have incoming busses
    nextBusStops(currLocation, previousLocationArray)


    //We will update the bus's last ping location and time
    busRef.set({
      lastPing: new Date().toISOString(),
      lastLongitude: data.lon, // Current Longitutde Ping
      lastLatitude: data.lat, // Current Latitude Ping
      previousLongitude: lastLong, // Previous Longitude Ping
      previousLatitude: lastLat, // Previous Latitude Ping
      previousLocationArray: previousLocationArray,
      direction: direction, 
      heading: heading.toString(),
      route: data.route,
      id: data.id,
      sid: data.sid,
    })
  })

  // Debugging purposes
  let countRef = defaultDatabase.collection('count').doc('count')
  countRef.get().then((doc) => {
    // We update the sid count
    let sidCount = doc.data()[data.sid]
    if (sidCount === undefined) {
      sidCount = 0
    }
    sidCount++
    countRef.set({[data.sid]: sidCount}, {merge: true})
  })

  // Send a response to the base station
  res.status(200).send('OK')
})

// For the contact us form
router.post('/contact', function (req, res) {
  let data = req.body
  // Get a database reference to the collection of responses
  let responsesRef = defaultDatabase.collection('responses')

  try {
    // Add a new document in collection "responses"
    responsesRef.add({
      name: data.name,
      email: data.email,
      message: data.message,
    })

    // Send a response to the client
    res.send('OK')
  } catch (err) {
    res.status(500).send('Error sending message')
  }
})

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

// Validates and confirms data
function dataValidate(data) {
  if (
    !data ||
    !data.id ||
    !data.lon ||
    !data.lat ||
    !data.route ||
    !data.key ||
    !data.sid ||
    Object.keys(data).length != 6
  ) { return true;}
  else { return false;}
}

module.exports = router
