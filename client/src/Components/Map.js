import React, {useState, useContext} from 'react'
import MapComponent from './MapComponent'
import Metro from './Metro'
import Button from '@mui/material/Button'
import SettingsContext from './SettingsContext'

export default function Map() {
  // Coordinates of UCSC
  const center = {lat: 36.99, lng: -122.06}
  const zoom = 15
  //const [displayUCSC, setDisplayUCSC] = useState(true)
  const {settings, dispatch} = useContext(SettingsContext)
  /*
  function toggleDisplayUCSC() {
    setDisplayUCSC(!displayUCSC)
  }
*/
  return (
    <>
      {settings.displayUCSC ? <MapComponent center={center} zoom={zoom} /> : <Metro />}
      <Button
        onClick={()=>dispatch({type:"SET_DISPLAY_UCSC"})}
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
        {settings.displayUCSC ? 'Metro' : 'Loop'}
      </Button>
    </>
  )
}
