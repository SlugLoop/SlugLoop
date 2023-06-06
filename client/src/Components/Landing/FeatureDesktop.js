import React, {useContext} from 'react'
import {Box, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import AppContext from '../../appContext'
import GetAppIcon from '@mui/icons-material/GetApp'

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
          justifyContent="flex-start"
          padding={5}
          backgroundColor={darkMode ? '' : 'rgba(255, 255, 255, 0.8)'}
          borderRadius="10px"
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ListItemIcon>
              <DirectionsBusIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5" color="text.primary" align="center">
              Track campus shuttles in real time
            </Typography>
            <Typography variant="h6" color="text.primary">
              With SlugLoop, you get real-time locations of all loop buses,
              complete with route names. This feature lets you know not just
              when, but also where the loop buses are heading, eliminating the
              need to be physically present at the bus station.
            </Typography>
          </Stack>
        </Box>
        <Box
          height="300px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          padding={5}
          backgroundColor={darkMode ? '' : 'rgba(255, 255, 255, 0.8)'}
          borderRadius="10px"
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ListItemIcon>
              <TrainIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5" color="text.primary" align="center">
              Live locations of Metro buses
            </Typography>
            <Typography variant="h6" color="text.primary">
              Beyond Campus Shuttles, SlugLoop extends its service by providing
              live location data for metro buses. Importantly, we track all the
              metro buses that come on campus, including lines 10, 15, 18, 19,
              and 20, keeping you well-informed and ready for all your on-campus
              commutes.
            </Typography>
          </Stack>
        </Box>
        <Box
          height="300px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          padding={5}
          backgroundColor={darkMode ? '' : 'rgba(255, 255, 255, 0.8)'}
          borderRadius="10px"
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ListItemIcon>
              <GetAppIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h5" color="text.primary" align="center">
              Progressive Web App
            </Typography>
            <Typography variant="h6" color="text.primary">
              You can install SlugLoop on your device for even quicker access.
              Just use your browser's 'Add to Home screen' option and enjoy our
              service as a Progressive Web App. This allows for a full-screen
              experience and faster load times, making campus navigation easier
              than ever.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
