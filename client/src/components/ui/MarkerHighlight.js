'use client'

import React from 'react'
import {cx} from './cx'

export default function MarkerHighlight({children, strong = false, className, ...props}) {
  return (
    <span
      className={cx('marker-highlight', strong && 'marker-highlight--strong', className)}
      {...props}
    >
      {children}
    </span>
  )
}
