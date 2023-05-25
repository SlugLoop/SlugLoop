import {Box, Button, Stack, Typography} from '@mui/material'
import React from 'react'

export default function Hero() {
  return (
    <Box
      component="section"
      width="100vw"
      height="100vh"
      sx={{
        backgroundImage: 'url(background/abstract.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        paddingTop="20vh"
      >
        <Typography variant="h2" color="white">
          Slug Loop
        </Typography>
        <Typography
          variant="h5"
          color="white"
          sx={{
            paddingBottom: '20px',
          }}
        >
          Bus Tracking. Simplified.
        </Typography>
        <Button variant="contained" color="primary" href="/map">
          Map
        </Button>
      </Stack>
      <Stack
        width="100%"
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        position="absolute"
        bottom="15vh"
      >
        <Typography variant="h4" align="center" color="white">
          Made By Students
        </Typography>
        <Typography variant="h5" align="center" color="white">
          For Students
        </Typography>
      </Stack>
    </Box>
  )
}
