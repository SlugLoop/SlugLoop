'use client'

import React from 'react'
import {cx} from './cx'

/**
 * Hand-drawn squiggle arrow. Two variants:
 *  - direction="right" (default): rightward squiggle with arrowhead on the right
 *  - direction="down": downward squiggle, useful between timeline entries
 *  - direction="curve": curved arrow that loops (good for "look here" style)
 */
export default function PencilArrow({
  direction = 'right',
  width,
  height,
  className,
  strokeWidth = 2.4,
  color = 'currentColor',
  ...props
}) {
  if (direction === 'down') {
    return (
      <svg
        viewBox="0 0 60 180"
        width={width ?? 60}
        height={height ?? 180}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cx('pencil-arrow', className)}
        aria-hidden="true"
        {...props}
      >
        <path d="M30 6 C 18 28, 42 50, 28 74 C 14 98, 46 120, 30 150" />
        <path d="M22 142 L30 158 L40 144" />
      </svg>
    )
  }

  if (direction === 'curve') {
    return (
      <svg
        viewBox="0 0 200 140"
        width={width ?? 200}
        height={height ?? 140}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cx('pencil-arrow', className)}
        aria-hidden="true"
        {...props}
      >
        <path d="M10 110 C 30 30, 130 10, 180 60 C 192 70, 188 90, 170 96" />
        <path d="M156 84 L170 98 L162 114" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 220 60"
      width={width ?? 220}
      height={height ?? 60}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('pencil-arrow', className)}
      aria-hidden="true"
      {...props}
    >
      <path d="M6 32 C 36 12, 70 50, 100 28 C 130 10, 160 46, 196 32" />
      <path d="M180 22 L198 32 L184 46" />
    </svg>
  )
}
