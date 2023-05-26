import React, {useContext} from 'react'
import {Box, Button, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import SearchIcon from '@mui/icons-material/Search'
import AppContext from '../../appContext'

export default function Features() {
  const {darkMode} = useContext(AppContext)
  return (
    <Box
      component="section"
      width="100vw"
      height="100vh"
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: 'url(background/buses.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,

          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
        }}
      />
      <Typography
        variant="h4"
        align="center"
        color="text.primary"
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
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          paddingTop: '8vh',
        }}
      >
        <Box
          sx={{
            backgroundColor: darkMode ? '' : 'rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
            p: 2,
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ListItemIcon>
              <DirectionsBusIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5" color="text.primary">
              Real Time Locations of All Campus Shuttles (Loop) Buses
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: darkMode ? '' : 'rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
            p: 2,
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ListItemIcon>
              <TrainIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5" color="text.primary">
              Real Time Locations of All Santa Cruz (Metro) Buses
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: darkMode ? '' : 'rgba(255, 255, 255, 0.6)',
            borderRadius: '10px',
            p: 2,
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ListItemIcon>
              <SearchIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5" color="text.primary">
              Advanced filtering methods for both Loop and Metro Buses
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
