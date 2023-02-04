import {Wrapper} from '@googlemaps/react-wrapper';
import React from 'react';
import MapComponent from './MapComponent';

export default function Map() {
  const center = {lat: 36.99, lng: -122.06};
  const zoom = 15;
  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
      <MapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}
