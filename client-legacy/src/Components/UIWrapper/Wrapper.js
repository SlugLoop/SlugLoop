import React from 'react'
import {Box, useMediaQuery, useTheme} from '@mui/material'
import MobileTopBar from '../TopBar/TopBarMobile'
import DesktopTopBar from '../TopBar/TopBarDesktop'

export default function Wrapper({children, sx}) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={sx}>
      {isDesktop ? <DesktopTopBar /> : <MobileTopBar />}
      {children}
    </Box>
  )
}
