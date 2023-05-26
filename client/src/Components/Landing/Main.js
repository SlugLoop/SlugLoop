import React from 'react'
import Hero from './Hero'
import Features from './Feature'
import {Box} from '@mui/material'

export default function Main() {
  return (
    <Box
      width="100vw"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
      }}
    >
      <Hero />
      <Features />
    </Box>
  )
}
