const express = require('express')
const router = express.Router()
const axios = require('axios')
require('dotenv').config()
const defaultDatabase = require('./firebase.js')

const lockName = 'myLock'
let myLock = false

// This function will run when the SIGTERM signal is received
function handleShutdownSignal(signal) {
  console.log(`Received ${signal}.`)

  // Only release the lock if this instance holds it
  if (myLock) {
    console.log('Releasing lock and shutting down.')
    releaseLock(lockName)
      .then(() => {
        console.log('Lock released. Exiting.')
        process.exit(0)
      })
      .catch((error) => {
        console.error(`Failed to release lock: ${error}`)
        process.exit(1)
      })
  } else {
    console.log('Not holding the lock. Exiting.')
    process.exit(0)
  }
}

// Listen for the signals
process.on('SIGTERM', () => handleShutdownSignal('SIGTERM'))
process.on('SIGINT', () => handleShutdownSignal('SIGINT'))
;(async () => {
  const hasLock = await acquireLock(lockName)

  if (hasLock) {
    myLock = true
    setInterval(() => {
      const baseUrl = `${process.env.METRO_URL}/getvehicles`
      const routes = [10, 15, 18, 19, 20]
      const apiKey = process.env.METRO_KEY

      let metroRef = defaultDatabase.collection('metro')
      axios
        .get(`${baseUrl}?key=${apiKey}&rt=${routes.join(',')}&format=json`)
        .then((response) => {
          const buses = response.data['bustime-response'].vehicle
          buses.forEach((bus) => {
            metroRef.doc(bus.vid).set({
              id: bus.vid,
              route: bus.rt,
              lastLatitude: bus.lat,
              lastLongitude: bus.lon,
              lastPing: convertDateFormat(bus.tmstmp),
              heading: bus.hdg,
              capacity: bus.psgld,
            })
          })
        })
    }, 12000)
  } else {
    console.log('Another instance is holding the lock.')
  }
})()

// Mutexes!!!!!
// Thank you Professor Quinn
async function acquireLock(lockName) {
  const lockRef = defaultDatabase.collection('locks').doc(lockName)
  const lockSnapshot = await lockRef.get()

  if (!lockSnapshot.exists) {
    await lockRef.set({locked: true})
    return true
  }

  const lockData = lockSnapshot.data()
  if (!lockData.locked) {
    await lockRef.update({locked: true})
    return true
  }

  return false
}

async function releaseLock(lockName) {
  const lockRef = defaultDatabase.collection('locks').doc(lockName)
  await lockRef.update({locked: false})
}

router.get('/metroBuses', function (req, res) {
  const baseUrl = `${process.env.METRO_URL}/getvehicles`
  const routes = [10, 15, 18, 19, 20]
  const apiKey = process.env.METRO_KEY
  try {
    let busesArray = []
    axios
      .get(`${baseUrl}?key=${apiKey}&rt=${routes.join(',')}&format=json`)
      .then((response) => {
        const buses = response.data['bustime-response'].vehicle
        buses.forEach((bus) => {
          busesArray.push({
            id: bus.vid,
            route: bus.rt,
            lastLatitude: bus.lat,
            lastLongitude: bus.lon,
            lastPing: convertDateFormat(bus.tmstmp),
            heading: bus.hdg,
            capacity: bus.psgld,
          })
        })
        res.status(200).send(busesArray)
      })
  } catch {
    res.status(500).send('Error fetching buses')
  }
})

function convertDateFormat(input) {
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

module.exports = router
