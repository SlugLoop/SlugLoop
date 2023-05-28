import { calcCWorCCW } from "./direction.js"
const busStops = require('./bus-stops.json')
const defaultDatabase = require('./firebase.js')

// updates next 3 bus stops for every bus
export function nextBusStops() {
  const busCollection = [];
  let stops_arr_CW = [];
  let stops_arr_CCW = [];

  // Push all bus ID's into array
  defaultDatabase.collection('busses').get().then(function(querySnapshot) {
    querySnapshot.forEach(doc => {
      // Store the busses into busCollection as an array of objects
      busCollection.push ({
        latitude: doc.data().lastLatitude,
        longitude: doc.data().lastLongitude,
        previousLocationArray: doc.data().previousLocationArray
      });
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

  // Update the database for each bus stops in the object array
  dbUpdate(stops_arr_CW, "CW");
  dbUpdate(stops_arr_CCW, "CCW");

  return;
}
  
function soonBusStop(ref, stops_arr_CW, stops_arr_CCW, index) {
  let direction;
  let lat1 = ref[index].latitude;
  let lon1 = ref[index].longitude;
  let previousLocationArray = ref[index].previousLocationArray;

  direction = calcCWorCCW({lat1, lon1}, previousLocationArray)
  
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
      if((lat2 - 0.000450) <= lat1 && (lat2 + 0.000450) >= lat1 
      && (lon2 - 0.000450) <= lon1 && (lon2 + 0.000450) >= lon1) {
        for (let j = 1; i <= 3; j++) {
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
      if((lat2 - 0.000450) <= lat1 && (lat2 + 0.000450) >= lat1 
      && (lon2 - 0.000450) <= lon1 && (lon2 + 0.000450) >= lon1) {
        for (let j = 1; i <= 3; j++) {
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
    let stopRef = defaultDatabase.collection('busStop').document(direction);

    // Variable for setting id = true
    let updates = {};
    soonBusStops.forEach((soonBusStops) => {
      updates[soonBusStops.id] = soonBusStops.value;
    });

    // Updates the firebase in one call
    stopRef.update(updates);
}
  