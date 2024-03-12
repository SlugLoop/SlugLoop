// Imports
var calcCWorCCW = require('./direction.js')
const busStops = require('../data/bus-stops.json')
const defaultDatabase = require('../initialization/firebase.js');
// const e = require('express');
const {getDistanceFromLatLonInMeters} = require("./pingHelper.js")

// Updates the next bus stops for every bus
async function nextBusStops() {
  const busCollection = [];

  // Wait for the database query to complete
  const querySnapshot = await defaultDatabase.collection('busses').get();
  
  // Store the busses into busCollection as an array of objects
  querySnapshot.forEach(doc => {
    busCollection.push({
      latitude: doc.data().lastLatitude,
      longitude: doc.data().lastLongitude,
      previousLocationArray: doc.data().previousLocationArray
    });
  });

  // Create a batch for updating ETA
  const batch = defaultDatabase.batch()
  let updates = {}

  // Pass the collection and object arrays for data validation
  for (let i = 0; i < busCollection.length; i++) {
    let [distance, closestStop] = closestBusStop(busCollection[i])
    let secondsTillDest = (distance / 9)

    // Get Bus direction (Defaults to CCW to prevent errors)
    let direction = (busCollection[i].previousLocationArray === undefined) ? "ccw" : calcCWorCCW({ lat: busCollection[i].latitude, lon: busCollection[i].longitude}, busCollection[i].previousLocationArray);
    let stopData = (direction == "cw") ? busStops.bstop.CW : busStops.bstop.CCW;
    let stopRef = defaultDatabase.collection('busStop').doc(direction)
    let startIndex = stopData.findIndex(obj => closestStop in obj)
    // let remainingStops = stopData.slice(startIndex)

    stopData.forEach((stop, idx) => {
      // Stop -> "crown", "merill", etc.
      if (idx >= startIndex) {
        // Store ETA in seconds into collection busStop (per stop)
        updates[stop] = secondsTillDest
        // We assume it takes 105 seconds for each bus to go to the next bus stop (105 seconds = 1.75 minutes)
        secondsTillDest += 105;
      } else {
        // If the bus is not incoming, then set the time to null
        updates[stop] = null
        // batch.set(stopRef.collection("busStop").doc(stop), {ETA: null}, {merge: true})
      }
    })
  }

  batch.update(stopRef, updates);
  // Commit the batch
  await batch.commit()
  return;
}

function areListsEqual(list1, list2) {
  // Check if the lengths of the lists are equal
  if (list1.length !== list2.length) {
    return false;
  }

  // Compare each object in the lists by converting them to strings
  for (let i = 0; i < list1.length; i++) {
    if (JSON.stringify(list1[i]) !== JSON.stringify(list2[i])) {
      return false;
    }
  }

  // If all objects are equal, return true
  return true;
}

// Gets the closest bus stop given busData
function closestBusStop(busData) {
  let busLat = busData.latitude;
  let busLon = busData.longitude;
  // Finds the direction a bus is going in or returns "n/a" if previousLocationData is undefined
  let direction = (busData.previousLocationArray === undefined) ? "n/a" : calcCWorCCW({busLat, busLon}, busData.previousLocationArray);
  // Determines whether to use clockwise or counterclockwise bus stop data if undefined, we assume it is ccw
  let stopData = (direction == "cw") ? busStops.bstop.CW : busStops.bstop.CCW;
  let minDistance = Infinity;
  let closestStop = "";
  // Iterates through all bus stops and find closest stop
  for (let i = 0; i < stopData.length; i++) {
    // Note: Our data looks like this
    // {"key1" : {"lat": 1, "lon":-1, "metro":2}}
    // This loops over the object and extracts lat and lon (because there is only one key)
    let stopLat;
    let stopLon;
    for (let key in stopData[i]) {
      stopLat = stopData[i][key].lat
      stopLon = stopData[i][key].lon
    }
    // Find closest Bus Stop
    let distBusToStop = getDistanceFromLatLonInMeters(busLat, busLon, stopLat, stopLon)
    if (minDistance > distBusToStop) {
      minDistance = distBusToStop;
      closestStop = Object.keys(stopData[i])[0];
    }
  }
  // Just an error check (no closest bus found)
  if (closestStop == "" || minDistance == Infinity) {
    return undefined;
  } else {
    return [minDistance, closestStop];
  }
}

module.exports = {
  areListsEqual,
  nextBusStops,
  closestBusStop,
}

