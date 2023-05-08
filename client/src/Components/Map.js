import React, {useState} from 'react'
import MapComponent from './MapComponent'
import Metro from './Metro'
import Button from '@mui/material/Button'

export default function Map() {
  // Coordinates of UCSC
  const center = {lat: 36.99, lng: -122.06}
  const zoom = 15
  const [displayUCSC, setDisplayUCSC] = useState(true)

  function toggleDisplayUCSC() {
    setDisplayUCSC(!displayUCSC)
  }

  return (
    <>
      {displayUCSC ? <MapComponent center={center} zoom={zoom} /> : <Metro />}
      <Button
        onClick={toggleDisplayUCSC}
        disableRipple
        sx={{
          position: 'absolute',
          top: '20px',
          left: '120px',

          backgroundColor: 'white',
          borderRadius: '5px',
          opacity: '0.7',
        }}
      >
        {displayUCSC ? 'Metro' : 'Loop'}
      </Button>
    </>
  )
}
