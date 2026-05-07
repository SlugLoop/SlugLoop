'use client'

import React, {useState} from 'react'
import {Timestamp} from 'firebase/firestore'
import busColors from './bus.json'
import Tooltip from './ui/Tooltip'

export default function MapMarker(props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  function convertDateToHumanReadableTime(timestamp) {
    const currentTimestamp = Timestamp.now()
    const diffInMilliseconds = currentTimestamp.toMillis() - timestamp.toMillis()
    const seconds = Math.floor(diffInMilliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return `${seconds} seconds ago`
    if (minutes < 60) return `${minutes} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    return `${days} days ago`
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={busColors[props.route]}
        alt=""
        onLoad={() => setIsImageLoaded(true)}
        className="hidden"
      />
      {isImageLoaded && (
        <>
          {props.displayTime && (
            <p
              className="absolute top-[-20px] whitespace-nowrap text-sm"
              style={{color: props.darkMode ? 'white' : 'black'}}
            >
              {convertDateToHumanReadableTime(props.lastPing)}
            </p>
          )}
          <Tooltip
            content={
              <div>
                <p className="type-caption">Fleet ID: {props.fleetId}</p>
                <p className="type-caption">Direction: {props.direction}</p>
              </div>
            }
          >
            <img
              src={busColors[props.route]}
              alt="bus"
              style={{transform: `rotate(${props.heading}deg)`}}
            />
          </Tooltip>
        </>
      )}
    </div>
  )
}
