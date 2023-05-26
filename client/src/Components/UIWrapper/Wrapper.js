import React from 'react'

// This is a wrapper component that can be used to wrap non map elements
import MobileTopBar from '../TopBar/TopBarMobile'
export default function Wrapper({children}) {
  return (
    <>
      <MobileTopBar />
      {children}
    </>
  )
}
