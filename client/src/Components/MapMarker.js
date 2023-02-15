import {Box, Tooltip, Typography} from '@mui/material';
import React from 'react';

export default function MapMarker(props) {
  return (
    <>
      <Box
        component="img"
        src={`1.ico`}
        sx={{
          //Rotate the marker based on the heading of the bus
          transform: `rotate(${props.heading}deg)`,
        }}
      />
      <Typography>{props.bus.id}</Typography>
    </>
  );
}
