import {Box} from '@mui/material'
import React from 'react'
import AboutButton from './AboutButton'

export default function Metro() {
  const height = window.innerHeight + 175
  return (
    <Box
      width="100vw"
      height={window.innerHeight}
      sx={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        bottom: '0px',
        right: '0px',
        overflow: 'hidden',
      }}
    >
      <iframe
        src="https://cruzmetro.com/map#map_content"
        title="Metro"
        width="100%"
        height={height}
        style={{
          position: 'relative',
          top: '-177px',
          left: '0px',
          bottom: '0px',
          right: '0px',
          overflow: 'hidden',
        }}
      />
      <AboutButton />
    </Box>
  )
}
