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

  console.log(props.eta)

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
          <Box component="div">{props.name}</Box>
          {props.eta !== null && <Box component="div">{formatTime(props.eta)}</Box>}
        </>
      }
     placement="top">
      <Box component="img" src={busStop} alt={props.name} height="1rem" minHeight="20px" width="1rem" minWidth="20px"/>
    </Tooltip>
  )
}