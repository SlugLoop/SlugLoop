'use client'

import React from 'react'
import MobileTopBar from '../TopBar/TopBarMobile'
import DesktopTopBar from '../TopBar/TopBarDesktop'

export default function Wrapper({children, className}) {
  return (
    <div className={className}>
      <div className="hidden md:block">
        <DesktopTopBar />
      </div>
      <div className="block md:hidden">
        <MobileTopBar />
      </div>
      {children}
    </div>
  )
}
