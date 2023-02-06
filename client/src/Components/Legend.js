import {Box, Stack, Typography} from '@mui/material';
import React, {useState} from 'react';

export default function Legend(props) {
  const [open, setOpen] = useState(false);
  // Meant to be a legend for the map
  return (
    <Box
      maxWidth="150px"
      onClick={() => setOpen(!open)}
      sx={{
        padding: 2,
        position: 'absolute',
        bottom: '100px',
        left: '20px',
        backgroundColor: 'white',
        borderRadius: '5px',
        opacity: '0.7',

        // Animation children being rendered
        transition: 'all 0.5s ease-in-out',
      }}
    >
      <Stack direction="column" spacing={3}>
        <Typography variant="h7">Legend</Typography>
        {open &&
          Object.keys(props.legendItems).map((route) => (
            <Stack direction="row" spacing={2} key={route}>
              <img
                src={props.legendItems[route].icon}
                alt="Bus Icon"
                width="20px"
                height="20px"
              />
              <Typography variant="body2">
                {props.legendItems[route].name}
              </Typography>
            </Stack>
          ))}
      </Stack>
    </Box>
  );
}
