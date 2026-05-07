'use client'

import React from 'react'
import {cx} from './cx'

export default function Tape({
  color = 'yellow',
  length = 'md',
  rotate = -8,
  top,
  left,
  right,
  bottom,
  className,
  style,
}) {
  const lengthClass = length === 'long' ? 'tape--long' : length === 'short' ? 'tape--short' : ''
  const colorClass = color === 'blue' ? 'tape--blue' : ''

  return (
    <span
      aria-hidden="true"
      className={cx('tape', lengthClass, colorClass, className)}
      style={{
        top,
        left,
        right,
        bottom,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    />
  )
}
