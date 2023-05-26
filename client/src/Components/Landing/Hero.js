import {Box, Button, Stack, Typography} from '@mui/material'
import AppContext from '../../appContext'
import React, {useContext} from 'react'

export default function Hero() {
  const {darkMode} = useContext(AppContext)
  return (
    <Box
      component="section"
      width="100vw"
      height="100vh"
      sx={{
        overflow: 'hidden',
      }}
    >
      <Box
        width="100vw"
        height="100vh"
        sx={{
          backgroundImage: 'url(background/bus.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'hidden',
          position: 'absolute',
          zIndex: -1,

          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
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
