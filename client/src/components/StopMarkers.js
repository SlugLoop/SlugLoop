'use client'

import React from 'react'
import busStop from '../data/busStop.png'
import Tooltip from './ui/Tooltip'

export default function StopMarker(props) {
  const humanReadableName = (name) => {
    let returnedName = ''
    for (let i = 0; i < name.length; i++) {
      if (name[i] === '_') {
        returnedName += ' & '
      } else {
        if (name[i] === name[i].toUpperCase() && i !== 0 && isNaN(name[i])) {
          returnedName += ' '
        }
        returnedName += name[i]
      }
    }
    return returnedName
  }

  const displayName = humanReadableName(props.name)

  function formatTime(time) {
    if (time < 60) return 'Arrival: < 1 minute'
    return `Arrival: ${Math.ceil(time / 60)} minutes`
  }

  return (
    <Tooltip
      content={
        <>
          <div className="text-base">{displayName}</div>
          {props.eta !== null && <div className="text-sm">{formatTime(props.eta)}</div>}
        </>
      }
    >
      <img
        src={busStop.src ?? busStop}
        alt={displayName}
        className="relative h-4 min-h-5 w-4 min-w-5 -translate-x-1/2 -translate-y-1/2"
      />
    </Tooltip>
  )
}
