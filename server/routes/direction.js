// Calculate direction of bus
module.exports = function calcCWorCCW ({lat1, lon1}, previousLocationArray) {
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

// Determine if bus is going up or down
function latitudeDecreasing(previousLocationArray) {
  total = 0;
  for (let i = previousLocationArray.length - 1; i >= 1; i--) {
    if((previousLocationArray[i].lat - previousLocationArray[i-1].lat) > 0) {
      total += 1;
    }
    else {
      total -= 1;
    }
  }
  if (total > 0) { 
    return false;
  }
  return true;
    
}
  
// Determine if bus is going left or right
function longitudeDecreasing(previousLocationArray) {
  total = 0;
  for (let i = previousLocationArray.length - 1; i >= 1; i--) {
    if((previousLocationArray[i].lon - previousLocationArray[i-1].lon) > 0) {
      total += 1;
    }
    else {
      total -= 1;
    }
  }
  if (total > 0) { 
    return false; 
  }
  return true;
}
