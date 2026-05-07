import React from 'react'
import {cx} from './cx'

export default function Avatar({src, alt, className, size = 88}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cx(
        'rounded-full border-[3px] border-[var(--ink)] object-cover',
        className,
      )}
      style={{boxShadow: '0 4px 0 var(--highlighter), 0 8px 14px rgba(13,27,42,0.18)'}}
    />
  )
}
