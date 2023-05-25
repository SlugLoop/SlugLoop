import React from 'react'
import {Box, Button, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import SearchIcon from '@mui/icons-material/Search'

export default function Features() {
  return (
    <Box
      component="section"
      width="100vw"
      height="100vh"
      sx={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(background/buses.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        color="white"
        sx={{
          paddingTop: '20vh',
        }}
      >
        Features:
      </Typography>
      <Stack
        width="80%"
        direction="column"
        spacing={2}
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{
          paddingTop: '8vh',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <ListItemIcon>
            <DirectionsBusIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <Typography variant="h5" color="white">
            Real Time Locations of All Campus Shuttles (Loop) Buses
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ListItemIcon>
            <TrainIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <Typography variant="h5" color="white">
            Real Time Locations of All Santa Cruz (Metro) Buses
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ListItemIcon>
            <SearchIcon color="primary" fontSize="large" />
          </ListItemIcon>
          <Typography variant="h5" color="white">
            Advanced filtering methods for both Loop and Metro Buses
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
