const express = require('express')
const router = express.Router()
const axios = require('axios')
const rateLimit = require('express-rate-limit')
const moment = require('moment-timezone')
const {Timestamp} = require('@google-cloud/firestore')
require('dotenv').config()
const defaultDatabase = require('./firebase.js')
const nextBusStops = require('./soonBusStop.js')

// const lockName = 'myLock'
// let myLock = false

// // This function will run when the SIGTERM signal is received
// function handleShutdownSignal(signal) {
//   console.log(`Received ${signal}.`)

//   // Only release the lock if this instance holds it
//   if (myLock) {
//     console.log('Releasing lock and shutting down.')
//     releaseLock(lockName)
//       .then(() => {
//         console.log('Lock released. Exiting.')
//         process.exit(0)
//       })
//       .catch((error) => {
//         console.error(`Failed to release lock: ${error}`)
//         process.exit(1)
//       })
//   } else {
//     console.log('Not holding the lock. Exiting.')
//     process.exit(0)
//   }
// }

// // Listen for the signals
// process.on('SIGTERM', () => handleShutdownSignal('SIGTERM'))
// process.on('SIGINT', () => handleShutdownSignal('SIGINT'))
// ;(async () => {
//   const hasLock = await acquireLock(lockName)

//   if (hasLock) {
//     myLock = true
//     setInterval(() => {
//       const baseUrl = `${process.env.METRO_URL}/getvehicles`
//       const routes = [10, 15, 18, 19, 20]
//       const apiKey = process.env.METRO_KEY

//       let metroRef = defaultDatabase.collection('metro')
//       axios
//         .get(`${baseUrl}?key=${apiKey}&rt=${routes.join(',')}&format=json`)
//         .then((response) => {
//           const buses = response.data['bustime-response'].vehicle
//           buses.forEach((bus) => {
//             metroRef.doc(bus.vid).set({
//               id: bus.vid,
//               route: bus.rt,
//               lastLatitude: bus.lat,
//               lastLongitude: bus.lon,
//               lastPing: convertDateTimestamp(bus.tmstmp),
//               heading: bus.hdg,
//               capacity: bus.psgld,
//             })
//           })
//         })
//     }, 12000)
//   } else {
//     console.log('Another instance is holding the lock.')
//   }
// })()

// // Mutexes!!!!!
// // Thank you Professor Quinn
// async function acquireLock(lockName) {
//   const lockRef = defaultDatabase.collection('locks').doc(lockName)
//   const lockSnapshot = await lockRef.get()

//   if (!lockSnapshot.exists) {
//     await lockRef.set({locked: true})
//     return true
//   }

//   const lockData = lockSnapshot.data()
//   if (!lockData.locked) {
//     await lockRef.update({locked: true})
//     return true
//   }

//   return false
// }

// async function releaseLock(lockName) {
//   const lockRef = defaultDatabase.collection('locks').doc(lockName)
//   await lockRef.update({locked: false})
// }

router.get('/metroBuses', function (req, res) {
  const baseUrl = `${process.env.METRO_URL}/getvehicles`
  const routes = [10, 15, 18, 19, 20]
  const apiKey = process.env.METRO_KEY

  let busesArray = []
  axios
    .get(`${baseUrl}?key=${apiKey}&rt=${routes.join(',')}&format=json`)
    .then((response) => {
      const buses = response.data['bustime-response'].vehicle
      if (buses === undefined) {
        res.status(200).send([])
        return
      }
      buses.forEach((bus) => {
        busesArray.push({
          id: bus.vid,
          route: bus.rt,
          lastLatitude: bus.lat,
          lastLongitude: bus.lon,
          lastPing: convertDateString(bus.tmstmp),
          heading: bus.hdg,
          capacity: bus.psgld,
        })
      })
      res.status(200).send(busesArray)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send('Error fetching buses')
    })
})
//Get metro routes
router.get('/metroRoutes', async function (req, res) {
  const baseUrl = `${process.env.METRO_URL}/getroutes`
  const apiKey = process.env.METRO_KEY
  try {
    let routesArray = []
    const response = await axios.get(`${baseUrl}?key=${apiKey}&format=json`)
    response.data['bustime-response'].routes.forEach((route) => {
      routesArray.push({
        routeID: route.rt,
        routeName: route.rtnm,
        routeColor: route.rtclr,
      })
    })
    res.status(200).send(routesArray)
  } catch {
    res.status(500).send('Error fetching routes')
  }
})

router.get('/metroRouteDirections', async function (req, res) {
  const baseUrl = `${process.env.METRO_URL}/getdirections`
  const routes = [10, 15, 18, 19, 20]
  const apiKey = process.env.METRO_KEY
  const routePromises = routes.map((route) => {
    return axios
      .get(`${baseUrl}?key=${apiKey}&rt=${route}&format=json`)
      .then((response) => {
        const routeDirections = response.data['bustime-response'].directions
        return routeDirections.map((direction) => {
          return {
            routeID: route,
            directionID: direction.id,
            directionName: direction.name,
          }
        })
      })
  })

  try {
    const allRouteDirections = await Promise.all(routePromises)
    // Flatten the array of arrays into a single array
    const routeDirectionsArray = [].concat(...allRouteDirections)
    res.status(200).send(routeDirectionsArray)
  } catch (error) {
    console.error(error) // Log the error for debugging
    res.status(500).send('Error fetching directions')
  }
})

//Get route predictions
router.get('/metroRoutePredictions', async function (req, res) {
  const baseUrl = `${process.env.METRO_URL}/getpredictions`
  const stpid = req.query.stpid
  const apiKey = process.env.METRO_KEY
  try {
    let predictionArray = []
    let response = await axios.get(
      `${baseUrl}?key=${apiKey}&stpid=${stpid}&format=json`,
    )
    console.log(response.data['bustime-response'].error)
    const predictions = response.data['bustime-response'].prd

    predictions.forEach((prediction) => {
      predictionArray.push({
        timestamp: prediction.tmstmp,
        type: prediction.typ,
        routeID: prediction.rt,
        predictionTime: prediction.prdtm,
      })
    })
    res.status(200).send(predictionArray)
  } catch {
    res.status(200).send('No data found')
  }
})

function convertDateTimestamp(input) {
  // const year = input.slice(0, 4)
  // const month = input.slice(4, 6)
  // const day = input.slice(6, 8)
  // const time = input.slice(9)
  // const hours = time.slice(0, 2)
  // const minutes = time.slice(3, 5)

  // // Calculate the offset for PDT
  // const pdtOffsetHours = 7 // 7 hours

  // // Create a UTC date directly using Date.UTC() method
  // const utcDate = new Date(
  //   Date.UTC(
  //     parseInt(year),
  //     parseInt(month) - 1, // Months are zero-based in JavaScript Date
  //     parseInt(day),
  //     parseInt(hours) + pdtOffsetHours,
  //     parseInt(minutes),
  //   ),
  // )
  const momentDate = moment.tz(input, 'YYYYMMDD HH:mm', 'America/Los_Angeles')
  // Convert to UTC
  const utcDate = momentDate.tz('America/Los_Angeles').utc().toDate()
  const timestamp = Timestamp.fromDate(utcDate)
  return timestamp
}

function convertDateString(input) {
  const year = input.slice(0, 4)
  const month = input.slice(4, 6)
  const day = input.slice(6, 8)
  const time = input.slice(9)
  const hours = time.slice(0, 2)
  const minutes = time.slice(3, 5)

  // Calculate the offset for PDT
  const pdtOffsetHours = 7 // 7 hours

  // Create a UTC date directly using Date.UTC() method
  const utcDate = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1, // Months are zero-based in JavaScript Date
      parseInt(day),
      parseInt(hours) + pdtOffsetHours,
      parseInt(minutes),
    ),
  )

  return utcDate.toISOString()
}

async function updateMetroBuses() {
  const baseUrl = `${process.env.METRO_URL}/getvehicles`
  const routes = [10, 15, 18, 19, 20]
  const apiKey = process.env.METRO_KEY

  const response = await axios.get(
    `${baseUrl}?key=${apiKey}&rt=${routes.join(',')}&format=json`,
  )
  const buses = response.data['bustime-response'].vehicle

  if (!buses && response.status === 200) {
    return 204
  }

  // TRANSACTIONS!!!!
  // Create a batch
  const batch = defaultDatabase.batch()

  buses.forEach((bus) => {
    const busRef = defaultDatabase.collection('metro').doc(bus.vid)
    batch.set(busRef, {
      id: bus.vid,
      route: bus.rt,
      lastLatitude: bus.lat,
      lastLongitude: bus.lon,
      lastPing: convertDateTimestamp(bus.tmstmp),
      heading: bus.hdg,
      capacity: bus.psgld,
    })
  })

  // Commit the batch
  await batch.commit()
  return 200
}

// Create a rate limiter middleware
// Limit to 1 every 9 seconds
const limiter = rateLimit({
  windowMs: 9 * 1000, // 9 seconds
  max: 1, // limit each IP to 1 requests per windowMs
  keyGenerator: () => {
    // Constant key = rate limiting on all ips
    return 'metroBuses'
  },
})

// Apply the rate limiter to the specific route
router.put('/updateMetroBuses', limiter, async (req, res) => {
  try {
    const status = await updateMetroBuses()
    await nextBusStops()
    res.status(status).send('Updated metro buses')
  } catch (error) {
    console.error(`Failed to update buses: ${error}`)
    res.status(500).send('Error updating metro buses')
  }
})

async function metroETA(stop_id) {
  const baseUrl = 'http://rt.scmetro.org/bustime/api/v3/getpredictions'
  const apiKey = process.env.METRO_KEY

  return (response = await axios.get(
    `${baseUrl}?key=${apiKey}&stpid=${stop_id}&format=json`,
  ))
}

router.get('/metroEta', async function (req, res) {
  const stopId = req.query.stopId

  if (!stopId) {
    res.status(400).send('Invalid stop ID')
    return
  }

  try {
    const etas = await metroETA(stopId)

    // If there's an error in the response, forward it
    if (etas.error) {
      res.status(500).send(etas.error)
    } else {
      res.status(200).send(etas.data['bustime-response'].prd)
    }
  } catch (err) {
    console.log('Error getting ETAs', err)
    res.status(500).send('Error getting ETAs')
  }
})

module.exports = router
