'use client'

import React from 'react'
import AboutButton from './AboutButton'

export default function Metro() {
  let offset
  if (window.innerWidth > 600) {
    offset = 140
  } else if (window.innerWidth <= 400) {
    offset = 210
  } else {
    offset = 180
  }

  const height = window.innerHeight + offset

  return (
    <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
      <iframe
        src="https://cruzmetro.com/map#map_content"
        title="Metro"
        width="100%"
        height={height}
        style={{
          position: 'relative',
          top: `-${offset}px`,
          left: '-2px',
          overflow: 'hidden',
        }}
      />
      <AboutButton />
    </div>
  )
}
