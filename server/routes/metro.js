const express = require('express')
const router = express.Router()
const axios = require('axios')
require('dotenv').config()
const defaultDatabase = require('./firebase.js')

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

  const date = new Date(`${year}-${month}-${day}T${time}:00.000Z`)
  return date.toISOString()
}

module.exports = router
