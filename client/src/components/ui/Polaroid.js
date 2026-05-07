'use client'

import React from 'react'
import {cx} from './cx'

const rotationClass = {
  left: '',
  right: 'polaroid--rotate-right',
  flat: 'polaroid--rotate-flat',
}

export default function Polaroid({
  src,
  alt = '',
  caption,
  rotate = 'left',
  width = 280,
  height = 280,
  tape = true,
  tapeColor = 'yellow',
  hover = true,
  className,
  imageClassName,
  captionClassName,
  children,
  ...props
}) {
  return (
    <figure
      className={cx(
        'polaroid',
        rotationClass[rotate] ?? '',
        hover && 'polaroid--hover',
        'block',
        className,
      )}
      {...props}
    >
      {tape && (
        <span
          aria-hidden="true"
          className={cx(
            'tape tape--short',
            tapeColor === 'blue' && 'tape--blue',
          )}
          style={{top: -10, left: '50%', transform: 'translateX(-50%) rotate(-6deg)'}}
        />
      )}
      <div
        className={cx(
          'relative overflow-hidden bg-[#1a1a1a]',
          imageClassName,
        )}
        style={{width, height}}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-full w-full object-cover"
            style={{filter: 'contrast(0.96) saturate(0.92)'}}
          />
        ) : (
          children
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 60%), linear-gradient(180deg, rgba(13,27,42,0) 60%, rgba(13,27,42,0.18))',
            mixBlendMode: 'multiply',
          }}
        />
      </div>
      {caption && (
        <figcaption
          className={cx(
            'mt-3 px-1 type-hand text-[1.45rem] leading-tight text-[var(--ink)]',
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
