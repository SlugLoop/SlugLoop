var express = require('express')
var router = express.Router()
require('dotenv').config()

// Documentation
const OpenApiValidator = require('express-openapi-validator')
const swaggerUi = require('swagger-ui-express')
const apiDoc = require('./api-doc')

// Add cors
var cors = require('cors')
router.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
router.use(express.json())

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc))
router.use(
  OpenApiValidator.middleware({
    apiSpec: apiDoc,
    validateRequests: true,
  }),
)

var admin = require('firebase-admin')

let defaultApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY)),
})

let defaultDatabase = admin.firestore(defaultApp)

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

  // Check if the data is valid and check data length is 4
  if (
    !data ||
    !data.id ||
    !data.lon ||
    !data.lat ||
    !data.route ||
    !data.key ||
    !data.sid ||
    Object.keys(data).length !== 6
  ) {
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

  let lastLong = 0
  let lastLat = 0

  // Get the last ping location of the bus
  busRef.get().then((doc) => {
    if (doc.exists) {
      lastLong = doc.data().lastLongitude
      lastLat = doc.data().lastLatitude
    }

    //We will update the bus's last ping location and time
    busRef.set({
      lastPing: new Date().toISOString(),
      lastLongitude: data.lon,
      lastLatitude: data.lat,
      previousLongitude: lastLong, // Unintuitive naming, but that is what frontend uses
      previousLatitude: lastLat,
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

module.exports = router
