import {Box, Tooltip, Typography} from '@mui/material';
import React from 'react';

export default function MapMarker(props) {
  /*
  Bus Marker Component
  Returns a marker that rotates based on the heading of the bus and will be placed on the map
  Props: bus, heading
  Bus object contains id, lat, lon, route, timestamp
  */
  return (
    <>
      <Box
        component="img"
        src={`1.ico`}
        sx={{
          //Rotate the marker based on the heading of the bus in radians
          transform: `rotate(${props.heading}deg)`,
        }}
      />
      <Typography>{props.bus.id}</Typography>
    </>
  );
}
