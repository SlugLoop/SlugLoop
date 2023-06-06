import {Box} from '@mui/material'
import React, {useState} from 'react'

export default function BusStopMarker(props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  return (
    <Box
      sx={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* DON't TOUCH IT BREAKS IF YOU REMOVE*/}
      <img
        src="busStop.ico"
        alt="busStop"
        onLoad={() => setIsImageLoaded(true)}
        style={{display: 'none'}}
      />
      {isImageLoaded && (
        <Box
          component="img"
          src="busStop.ico"
          alt="busStop"
        />
      )}
    </Box>
  )
}