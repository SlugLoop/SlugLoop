import {Box, Button, Stack, Typography} from '@mui/material'
import AppContext from '../../appContext'
import React, {useContext} from 'react'

export default function HeroDesktop() {
  const {darkMode} = useContext(AppContext)
  console.log('HeroDesktop')
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        position: 'relative',
      }}
    >
      <Box
        width="100%"
        height="100vh"
        sx={{
          backgroundImage: 'url(background/landingDesktop.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
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
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        paddingTop="20vh"
      >
        <Typography variant="h2" color="text.primary">
          Slug Loop
        </Typography>
        <Typography
          variant="h5"
          color="text.primary"
          sx={{
            paddingBottom: '20px',
          }}
        >
          Bus Tracking. Simplified.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/map"
          sx={{
            '&:hover': {
              backgroundColor: 'secondary.main',
            },
          }}
        >
          Map
        </Button>
        <Typography variant="h5" align="center" color="text.primary">
          Made By Students
        </Typography>
        <Typography variant="h5" align="center" color="text.primary">
          For Students
        </Typography>
      </Stack>
    </Box>
  )
}
