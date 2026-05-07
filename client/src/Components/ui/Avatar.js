import React from 'react'
import {cx} from './cx'

export default function Avatar({src, alt, className, size = 88}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cx(
        'rounded-full border-2 border-[var(--color-secondary)] object-cover',
        className,
      )}
    />
  )
}
