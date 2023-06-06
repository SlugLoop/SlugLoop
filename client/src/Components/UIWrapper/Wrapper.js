import React from 'react'

// This is a wrapper component that can be used to wrap non map elements
import MobileTopBar from '../TopBar/TopBarMobile'
import DesktopTopBar from '../TopBar/TopBarDesktop'
import {useViewportWidth} from '../../App'
export default function Wrapper({children, sx}) {
  const viewportWidth = useViewportWidth()
  return (
    <div style={sx}>
      {viewportWidth > 600 ? <DesktopTopBar /> : <MobileTopBar />}
      {children}
    </div>
  )
}
