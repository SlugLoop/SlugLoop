const express = require('express')
const router = express.Router()
const metro = require('./metro')
require('dotenv').config()
const busStops = require('./bus-stops.json')

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

// Determine if bus is going up or down
function latitudeDecreasing(previousLocationArray) {
  total = 0;
  for (let i = 0; i < previousLocationArray.length - 1; i++) {
    if((previousLocationArray[i].lat - previousLocationArray[i+1].lat) > 0) {
      total += 1;
    }
    else {
      total -= 1;
    }
  }
  if (total > 0) return false;
  return true;
  
}

// Determine if bus is going left or right
function longitudeDecreasing(previousLocationArray) {
  total = 0;
  for (let i = 0; i < previousLocationArray.length - 1; i++) {
    if((previousLocationArray[i].lon - previousLocationArray[i+1].lon) > 0) {
      total += 1;
    }
    else {
      total -= 1;
    }
  }
  if (total > 0) return false;
  return true;
}

// Calculate direction of bus
function calcCWorCCW({lat1, lon1}, previousLocationArray) {
  // Lower Half
  if (36.977583 < lat1 && lat1 < 36.992444) {
    // Lower West Half
    if (lon1 < -122.055831) {
      if (latitudeDecreasing(previousLocationArray)) return "ccw";
      else return "cw";
    }
    // Lower East Half
    else {
      if (latitudeDecreasing(previousLocationArray)) return "cw";
      else return "ccw";
    }
  }

  // RCC Area
  if ((36.992444 <= lat1 && lat1 < 36.993316) && (-122.066566 < lon1 && lon1 < -122.061)) {
    if (longitudeDecreasing(previousLocationArray)) return "ccw";
    else return "cw";
  }

  // RCC to Kresge
  if ((36.993316 <= lat1 && lat1 < 36.999290) && lon1 < -122.062260) {
    if (latitudeDecreasing(previousLocationArray)) return "ccw";
    else return "cw";
  }

  // Baskin to Crown
  if ((36.999290 <= lat1) && (-122.064560 <= lon1 && lon1 < -122.054543)) {
    if (longitudeDecreasing(previousLocationArray)) return "ccw";
    else return "cw";
  }

  // Crown to East Remote
  if ((36.992444 <= lat1 && lat1 < 36.999290) && (lon1 >= -122.055831)) {
    if (latitudeDecreasing(previousLocationArray)) return "cw";
    else return "ccw";
  }

  // Bay and High Area
  if (36.977119 < lat1 && lat1 < 36.9775833) {
    // West Side
    if (lon1 < -122.053795) {
      if (longitudeDecreasing(previousLocationArray)) return "cw";
      else return "ccw";
    }
    // East Side
    if (lon1 >= -122.053795) {
      if (latitudeDecreasing(previousLocationArray)) return "cw";
      else return "ccw";
    }
  }
  return "n/a";
}


// updates next 3 bus stops

function nextBusStops({lat1, lon1}, previousLocationArray) {
  let direction = calcCWorCCW({lat1, lon1}, previousLocationArray)

  if (direction == "cw") {
    const cwData = busStops.bstop.CW;
    for (let i = 0; i < cwData.length; i++) {
      let location = cwData[i];
      let locationName = Object.keys(location)[0];
      let lat2 = location[locationName].lat;
      let lon2 = location[locationName].lon;
      if((lat2 - 0.000450) <= lat1 <= (lat2 + 0.000450)) {
        if ((lon2 - 0.000450) <= lon1 <= (lon2 + 0.000450)) {
          let stops_arr = [Object.keys(cwData[i + 1])[0], Object.keys(cwData[i + 2])[0], Object.keys(cwData[i + 3])[0]]
          soonBusStopUpdate(stops_arr, "CW");
        }
      } 
    }
  } 
  else if(direction == "ccw") {
    const ccwData = busStops.bstop.CCW;
    for (let i = 0; i < ccwData.length; i++) {
      let location = ccwData[i];
      let locationName = Object.keys(location)[0];
      let lat2 = location[locationName].lat;
      let lon2 = location[locationName].lon;
      if((lat2 - 0.000450) <= lat1 <= (lat2 + 0.000450)) {
        if ((lon2 - 0.000450) <= lon1 <= (lon2 + 0.000450)) {
          let stops_arr = [Object.keys(ccwData[i + 1])[0], Object.keys(ccwData[i + 2])[0], Object.keys(ccwData[i + 3])[0]]
          soonBusStopUpdate(stops_arr, "CCW");
        }
      }
    }
  }
}

// Set bus stops "Soon" to true if 

function soonBusStopUpdate(soonBusStops, direction) {
  // Get a database reference to the collection of stops given a direction
  const stopRef = defaultDatabase.collection('busStop').document(direction);

  // Get all the collection values inside the doc
  const stops =  async () => {
    await stopRef.listCollections();
    stops.forEach(stop => {
      if(soonBusStops.includes(stop.id)) {
        stop.update({
          soon: true
        });
      } else {
        stop.update({
          soon: false
        });
      };
    });
  };
}

module.exports = router
