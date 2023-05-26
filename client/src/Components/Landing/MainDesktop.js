import React from 'react'
import HeroDesktop from './HeroDesktop'
import FeaturesDesktop from './FeatureDesktop'
import {Box} from '@mui/material'

export default function MainDesktop() {
  return (
    <Box width="100%">
      <HeroDesktop />
      <FeaturesDesktop />
    </Box>
  )
}
