import {Box, Tooltip} from '@mui/material'
import React from 'react'
import busStop from "../data/busStop.png"
// import busColors from './bus.json'
// import { Timestamp } from "firebase/firestore"


export default function StopMarker(props) {
  // const [isImageLoaded, setIsImageLoaded] = useState(false)
  /*
  Stop Marker Component
  Returns a marker to mark the bus stops 
  Props: key lat lon name eta displayTime darkMode
  Stop object contains id, lat, lon, name
  */

  // I'm converting the names into more human readable names because it's nice for users
  const humanReadableName = (name) => {
    let returnedName = ""
    for (let i = 0; i < name.length; i++) {
      if (name[i] === "_") {
        returnedName += " & "
      } else {
        if (name[i] === name[i].toUpperCase() && i !== 0 && isNaN(name[i])) {
          returnedName += " "
        }
        returnedName += name[i]
      }
    }
    return returnedName
  }

  const displayName = humanReadableName(props.name)

  function formatTime(time) {
    if (time < 60) {
      return `Arrival: < 1 minute`
    } else {
      return `Arrival: ${Math.ceil(time / 60)} minutes`
    }
  }

  return (
    <Tooltip title=
      {
        <>
          <Box component="div" style={{fontSize:"1rem"}}>{displayName}</Box>
          {props.eta !== null && <Box component="div" style={{fontSize:"0.8rem"}}>{formatTime(props.eta)}</Box>}
        </>
      }
     placement="top" style={{position:"relative"}}>
      <Box component="img" src={busStop} alt={displayName} style={{
        position:"relative",
        transform: 'translate(-50%, -50%)',
        height:"1rem",
        minHeight:"20px",
        width:"1rem",
        minWidth:"20px"}}/>
    </Tooltip>
  )
}