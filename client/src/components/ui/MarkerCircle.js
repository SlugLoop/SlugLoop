'use client'

import React from 'react'
import {cx} from './cx'

export default function MarkerCircle({children, className, as: Tag = 'span', ...props}) {
  return (
    <Tag className={cx('marker-circle', className)} {...props}>
      {children}
    </Tag>
  )
}
