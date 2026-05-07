'use client'

import React from 'react'
import {cx} from './cx'

const rotationClass = {
  left: '',
  right: 'sticky-note--rotate-right',
  flat: 'sticky-note--rotate-flat',
}

const colorClass = {
  yellow: '',
  blue: 'sticky-note--blue',
  pink: 'sticky-note--pink',
}

export default function StickyNote({
  children,
  rotate = 'left',
  color = 'yellow',
  pin = false,
  className,
  style,
  size = 'md',
  ...props
}) {
  const sizeStyle =
    size === 'sm'
      ? {minWidth: 140, padding: '14px 14px 18px', fontSize: '1.15rem'}
      : size === 'lg'
        ? {minWidth: 230, padding: '22px 22px 28px', fontSize: '1.6rem'}
        : undefined

  return (
    <div
      className={cx('sticky-note', rotationClass[rotate], colorClass[color], className)}
      style={{...sizeStyle, ...style}}
      {...props}
    >
      {pin && (
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 16,
            height: 16,
            borderRadius: 999,
            background: 'radial-gradient(circle at 35% 35%, #ff6b6b, #b1242a 70%)',
            boxShadow: '0 2px 4px rgba(13,27,42,0.4), inset -2px -2px 3px rgba(0,0,0,0.3)',
          }}
        />
      )}
      {children}
    </div>
  )
}
