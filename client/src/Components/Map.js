import React from 'react'
import MapComponent from './MapComponent'

export default function Map() {
  // Coordinates of UCSC
  const center = {lat: 36.99, lng: -122.06}
  const zoom = 15

  return <MapComponent center={center} zoom={zoom} />

}
