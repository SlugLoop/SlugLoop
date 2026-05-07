'use client'

import React from 'react'
import {cx} from './cx'

/**
 * Tiny hand-drawn banana-slug doodle, used as a logo accent.
 */
export default function SlugDoodle({className, size = 28, ...props}) {
  return (
    <svg
      viewBox="0 0 64 36"
      width={size}
      height={size * (36 / 64)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx('slug-doodle', className)}
      aria-hidden="true"
      {...props}
    >
      {/* body: lumpy slug */}
      <path d="M4 24 C 4 16, 14 14, 22 18 C 28 21, 36 16, 44 19 C 52 22, 56 18, 60 14" />
      {/* belly underline */}
      <path d="M6 26 C 14 30, 22 28, 30 28 C 38 28, 46 26, 54 24" />
      {/* eye stalks */}
      <path d="M58 14 L62 8" />
      <path d="M54 14 L56 6" />
      {/* eye dots */}
      <circle cx="62" cy="7" r="1" fill="currentColor" />
      <circle cx="56" cy="5" r="1" fill="currentColor" />
    </svg>
  )
}
