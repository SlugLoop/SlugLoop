import { calcCWorCCW } from "./direction.js"
const busStops = require('./bus-stops.json')
const defaultDatabase = require('./firebase.js')

let bussesRef;
let busID = [];
let previousLocationArray = [];
let stops_arr_CW = [];
let stops_arr_CCW = [];
let lat1 = 0  // Current longitude
let lon1 = 0  // Current latitude

// updates next 3 bus stops for every bus
export function nextBusStops() {
  bussesRef = defaultDatabase.collection('busses');

  // Push all bus ID's into array
  defaultDatabase.collection("cities").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        busID.push(doc.id);
    });
  });

  // For each bus stop id, pass the id and store upcoming bus stops into array
  busID.forEach(soonBusStop);

  // Update the database for each bus stops in the array
  dbUpdate(stops_arr_CW, "CW");
  dbUpdate(stops_arr_CCW, "CCW");

  // Empty the arrays
  busID = [];
  previousLocationArray = [];
  stops_arr_CW = [];
  stops_arr_CCW = [];

  return;
}
  
function soonBusStop(item) {
  let busRef = bussesRef.doc(item);
  // Get the previous location array of busses and the current location
  busRef.get().then((doc) => {
    if (doc.exists) {
      // Fetch the current position
      lat1 = doc.data().lastLatitude;
      lon1 = doc.data().lastLongitude;
      // Fetching the previousLocationArray from the database, if it exists
      previousLocationArray = doc.data().previousLocationArray || [];
    }
  });

  let direction = calcCWorCCW({lat1, lon1}, previousLocationArray)
  
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
      // Find the bus stop closest to the bus, and store next 3 stops into an array
      if((lat2 - 0.000450) <= lat1 && (lat2 + 0.000450) >= lat1 
      && (lon2 - 0.000450) <= lon1 && (lon2 + 0.000450) >= lon1) {
        for (let j = 1; i <= 3; j++) {
          let stop_id = Object.keys(cwData[(i + j) % cwLength])[0];
          // If bus stop is not in array, push into array
          if (!stops_arr_CW.includes(stop_id)) {
            stops_arr_CW.push(stop_id);
          }
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
      // Find the bus stop closest to the bus, and store next 3 stops into an array
      if((lat2 - 0.000450) <= lat1 && (lat2 + 0.000450) >= lat1 
      && (lon2 - 0.000450) <= lon1 && (lon2 + 0.000450) >= lon1) {
        for (let j = 1; i <= 3; j++) {
          let stop_id = Object.keys(ccwData[(i + j) % ccwLength])[0];
          // If bus stop is not in array, push into array
          if (!stops_arr_CCW.includes(stop_id)) {
            stops_arr_CCW.push(stop_id);
          }
        }
        return;
      }
    }
  }
}

// Set bus stops "Soon" to true in the firestore DB if in array
function dbUpdate(soonBusStops, direction) {
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
  