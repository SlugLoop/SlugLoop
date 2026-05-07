'use client'

import React from 'react'
import {cx} from './cx'

const toneClass = {
  red: '',
  ink: 'stamp--ink',
  ocean: 'stamp--ocean',
}

export default function Stamp({
  children,
  label,
  tone = 'red',
  rotate,
  circular = false,
  size = 'md',
  className,
  animate = false,
  style,
  ...props
}) {
  const fontSize =
    size === 'sm' ? '0.66rem' : size === 'lg' ? '1.05rem' : size === 'xl' ? '1.35rem' : '0.82rem'

  return (
    <span
      className={cx(
        'stamp',
        toneClass[tone] ?? '',
        circular && 'stamp--circular',
        animate && 'stamp-animate',
        className,
      )}
      style={{
        fontSize,
        transform: rotate != null ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
      {...props}
    >
      {label ?? children}
    </span>
  )
}
