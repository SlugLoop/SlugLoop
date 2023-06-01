import {Box, Typography, Tooltip} from '@mui/material'
import React, {useState} from 'react'
import busColors from './bus.json'

export default function MapMarker(props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  /*
  Bus Marker Component
  Returns a marker that rotates based on the heading of the bus and will be placed on the map
  Props: bus, heading
  Bus object contains id, lat, lon, route, timestamp
  */
  function convertDateToHumanReadableTime(date) {
    const currentDateTime = new Date()
    const myDate = new Date(date)
    const diffInMilliseconds = currentDateTime.getTime() - myDate.getTime()

    const seconds = Math.floor(diffInMilliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) {
      return `${seconds} seconds ago`
    } else if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else {
      return `${days} days ago`
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={busColors[props.route]}
        alt="bus"
        onLoad={() => setIsImageLoaded(true)}
        style={{display: 'none'}}
      />
      {isImageLoaded && (
        <>
          {props.displayTime && (
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: props.darkMode ? 'white' : 'black',
                position: 'absolute',
                top: '-20px',
              }}
            >
              {convertDateToHumanReadableTime(props.lastPing)}
            </Typography>
          )}
          <Tooltip
            title={
              <Box>
                <Typography variant="caption" display="block">
                  Fleet ID: {props.fleetId}
                </Typography>
                <Typography variant="caption" display="block">
                  Direction: {props.direction}
                </Typography>
              </Box>
            }
            placement="top"
          >
            <Box
              component="img"
              src={busColors[props.route]}
              alt="bus"
              sx={{
                //Rotate the marker based on the heading of the bus in radians
                transform: `rotate(${props.heading}deg)`,
              }}
            />
          </Tooltip>
        </>
      )}
    </Box>
  )
}
