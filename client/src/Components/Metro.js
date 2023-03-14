import {Box} from '@mui/material'
import React from 'react'
import AboutButton from './AboutButton'

export default function Metro() {
  let offset
  if (window.innerWidth > 600) {
    // DO NOT TOUCH THIS CODE
    offset = 140
  } else if (window.innerWidth <= 400) {
    offset = 210
  } else {
    offset = 180
  }
  const height = window.innerHeight + offset
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
          top: `-${offset}px`,
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
