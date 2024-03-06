// Imports
var calcCWorCCW = require('./direction.js')
const busStops = require('../data/bus-stops.json')
const defaultDatabase = require('../initialization/firebase.js');
const e = require('express');

const radius = 0.001
var oldUpdateCW = []
var oldUpdateCCW = []

// updates next 3 bus stops for every bus
module.exports = async function nextBusStops() {
  const busCollection = [];
  let stops_arr_CW = [];
  let stops_arr_CCW = [];

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

  // Initialize CW array with false values
  const cwObj = busStops.bstop.CW;
  for (let i = 0; i < cwObj.length; i++) {
    let locationName = Object.keys(cwObj[i])[0];
    stops_arr_CW.push({
      id: locationName,
      value: false
    })
  }

  // Initialize CCW array with false values
  const ccwObj = busStops.bstop.CCW;
  for (let i = 0; i < ccwObj.length; i++) {
    let locationName = Object.keys(ccwObj[i])[0];
    stops_arr_CCW.push({
      id: locationName,
      value: false
    })
  }

  // Pass the collection and object arrays for data validation
  for (let i = 0; i < busCollection.length; i++) {
    soonBusStop(busCollection, stops_arr_CW, stops_arr_CCW, i);
  }

  // Update the database for each bus stops in the object array if different to old update
  if (!areListsEqual(stops_arr_CW, oldUpdateCW)) {
    dbUpdate(stops_arr_CW, "CW");
    oldUpdateCW = stops_arr_CW;
  }
  
  if (!areListsEqual(stops_arr_CCW, oldUpdateCCW)) {
    dbUpdate(stops_arr_CW, "CCW");
    oldUpdateCCW = stops_arr_CCW;
  }

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

  
function soonBusStop(ref, stops_arr_CW, stops_arr_CCW, index) {
  let direction;
  let lat1 = ref[index].latitude;
  let lon1 = ref[index].longitude;
  let previousLocationArray = ref[index].previousLocationArray;
  if(previousLocationArray === undefined) {
    direction = "n/a";
  }
  else {
    direction = calcCWorCCW({lat1, lon1}, previousLocationArray);
  }
  
  // If heading of bus is Clock-wise
  if (direction == "cw") {
    const cwData = busStops.bstop.CW;
    // Iterates through all CW bus stops, ends once it find closest stop
    let cwLength = cwData.length;
    for (let i = 0; i < cwLength; i++) {
      let location = cwData[i];
      let locationName = Object.keys(location)[0];
      let lat2 = location[locationName].lat;
      let lon2 = location[locationName].lon;
      // Find the bus stop closest to the bus, and set next 3 stops in array to true
      if((lat2 - radius) <= lat1 && (lat2 + radius) >= lat1 
      && (lon2 - radius) <= lon1 && (lon2 + radius) >= lon1) {
        for (let j = 1; j <= 3; j++) {
          let stop_id = Object.keys(cwData[(i + j) % cwLength])[0];
          let objIndex = stops_arr_CW.findIndex((e => e.id === stop_id));
          // If bus stop is in object array, set value to true
          if (objIndex != -1) {stops_arr_CW[objIndex].value = true;}
        }
        return;
      }
    }
  } 

  // If heading of bus is Counter Clock-wise
  else if(direction == "ccw") {
    const ccwData = busStops.bstop.CCW;
    // Iterates through all CCW bus stops, ends once it find closest stop
    let ccwLength = ccwData.length;
    for (let i = 0; i < ccwLength; i++) {
      let location = ccwData[i];
      let locationName = Object.keys(location)[0];
      let lat2 = location[locationName].lat;
      let lon2 = location[locationName].lon;
      // Find the bus stop closest to the bus, and set next 3 stops in array to true
      if((lat2 - radius) <= lat1 && (lat2 + radius) >= lat1 
      && (lon2 - radius) <= lon1 && (lon2 + radius) >= lon1) {
        for (let j = 1; j <= 3; j++) {
          let stop_id = Object.keys(ccwData[(i + j) % ccwLength])[0];
          let objIndex = stops_arr_CCW.findIndex((e => e.id === stop_id));
          // If bus stop is in object array, set value to true
          if (objIndex != -1) {stops_arr_CCW[objIndex].value = true;}
        }
        return;
      }
    }
  }
}

// Set bus stops "Soon" to true in the firestore DB if in array
function dbUpdate(soonBusStops, direction) {
    // Get a database reference to the collection of stops given a direction
    let stopRef = defaultDatabase.collection('busStop').doc(direction);

    // Variable for setting id = true
    let updates = {};
    soonBusStops.forEach((soonBusStops) => {
      updates[soonBusStops.id] = soonBusStops.value;
    });

    // Updates the firebase in one call
    stopRef.update(updates);
}
  
