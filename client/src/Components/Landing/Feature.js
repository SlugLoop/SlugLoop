import React, {useContext} from 'react'
import {Box, Stack, Typography, ListItemIcon} from '@mui/material'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import TrainIcon from '@mui/icons-material/Train'
import GetAppIcon from '@mui/icons-material/GetApp'
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
          paddingTop: '5vh',
        }}
      >
        <Box
          sx={{
            backgroundColor: darkMode ? '' : 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            p: 2,
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ListItemIcon>
              <DirectionsBusIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h7" color="text.primary">
              With SlugLoop, effortlessly track Campus Shuttle (Loop) buses,
              including their real-time locations and routes. Plan your journey
              and never miss a bus again.
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: darkMode ? '' : 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            p: 2,
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ListItemIcon>
              <TrainIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h7" color="text.primary">
              SlugLoop's service extends to Santa Cruz (Metro) buses. Stay
              informed and ready for your commute with live tracking of
              on-campus Metro buses, including lines 10, 15, 18, 19, and 20.
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: darkMode ? '' : 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            p: 2,
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ListItemIcon>
              <GetAppIcon color="secondary" fontSize="large" />
            </ListItemIcon>
            <Typography variant="h7" color="text.primary">
              Enjoy faster, full-screen access to SlugLoop by installing it as a
              Progressive Web App. Simply use your browser's 'Add to Home
              screen' option for improved convenience and seamless campus
              navigation.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
