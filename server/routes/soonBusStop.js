import { calcCWorCCW } from "./direction.js"
const busStops = require('./bus-stops.json')
const defaultDatabase = require('./firebase.js')

// updates next 3 bus stops
export function nextBusStops({lat1, lon1}, previousLocationArray) {
    let direction = calcCWorCCW({lat1, lon1}, previousLocationArray)
  
    // If heading of bus is Clock-wise
    if (direction == "cw") {
      const cwData = busStops.bstop.CW;
      // Iterates through all CW bus stops
      let cwLength = cwData.length;
      for (let i = 0; i < cwLength; i++) {
        let location = cwData[i];
        let locationName = Object.keys(location)[0];
        let lat2 = location[locationName].lat;
        let lon2 = location[locationName].lon;
        // Find the bus stop closest to the bus, and store next 3 stops into an array
        if((lat2 - 0.000450) <= lat1 <= (lat2 + 0.000450)) {
          if ((lon2 - 0.000450) <= lon1 <= (lon2 + 0.000450)) {
            let stops_arr = [Object.keys(cwData[(i + 1) % cwLength])[0], 
                             Object.keys(cwData[(i + 2) % cwLength])[0], 
                             Object.keys(cwData[(i + 3) % cwLength])[0]]
            // Pass the array into function for database updates for CW bus stops
            soonBusStopUpdate(stops_arr, "CW");
          }
        } 
      }
    } 
    // If heading of bus is Counter Clock-wise
    else if(direction == "ccw") {
      const ccwData = busStops.bstop.CCW;
      // Iterates through all CCW bus stops
      let ccwLength = ccwData.length;
      for (let i = 0; i < ccwLength; i++) {
        let location = ccwData[i];
        let locationName = Object.keys(location)[0];
        let lat2 = location[locationName].lat;
        let lon2 = location[locationName].lon;
        // Find the bus stop closest to the bus, and store next 3 stops into an array
        if((lat2 - 0.000450) <= lat1 <= (lat2 + 0.000450)) {
          if ((lon2 - 0.000450) <= lon1 <= (lon2 + 0.000450)) {
            let stops_arr = [Object.keys(ccwData[(i + 1) % ccwLength])[0], 
                             Object.keys(ccwData[(i + 2) % ccwLength])[0], 
                             Object.keys(ccwData[(i + 3) % ccwLength])[0]]
            // Pass the array into function for database updates for CCW bus stops
            soonBusStopUpdate(stops_arr, "CCW");
          }
        }
      }
    }
  }
  
// Set bus stops "Soon" to true in the firestore DB if in array
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
  