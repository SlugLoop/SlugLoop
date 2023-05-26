import React, {useContext} from 'react'
import {Box, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import SearchIcon from '@mui/icons-material/Search'
import AppContext from '../../appContext'

export default function FeaturesDesktop() {
  const {darkMode} = useContext(AppContext)
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        width="100%"
        height="100vh"
        sx={{
          backgroundImage: 'url(background/featureDesktop.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,

          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',

          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode ? 'none' : 'rgba(255, 255, 255, 0.4)',
          },
        }}
      />

      <Stack
        width="80%"
        direction="row"
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          height="300px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding={5}
          backgroundColor={darkMode ? '' : 'rgba(255, 255, 255, 0.8)'}
          borderRadius="10px"
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ListItemIcon>
              <DirectionsBusIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h6" color="text.primary">
              Track campus shuttles in real time: Using our app, you can get the
              real-time location of all Campus Shuttles (Loop) buses. Never miss
              your bus again, and optimize your time by knowing when to head to
              the stop.
            </Typography>
          </Stack>
        </Box>
        <Box
          height="300px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding={5}
          backgroundColor={darkMode ? '' : 'rgba(255, 255, 255, 0.8)'}
          borderRadius="10px"
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ListItemIcon>
              <TrainIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h6" color="text.primary">
              Live locations of Santa Cruz (Metro) buses: In addition to Campus
              Shuttles, our service also provides live location data for all
              Santa Cruz (Metro) buses.
            </Typography>
          </Stack>
        </Box>
        <Box
          height="300px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding={5}
          backgroundColor={darkMode ? '' : 'rgba(255, 255, 255, 0.8)'}
          borderRadius="10px"
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ListItemIcon>
              <SearchIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h6" color="text.primary">
              Advanced Filtering for both Loop and Metro Buses: Customize your
              tracking experience with our advanced filtering options. You can
              choose to filter by bus route, time, and more.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
