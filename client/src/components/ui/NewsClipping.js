'use client'

import React from 'react'
import {cx} from './cx'

export default function NewsClipping({
  source,
  date,
  headline,
  body,
  href,
  rotate = -1.2,
  className,
  ...props
}) {
  const Tag = href ? 'a' : 'article'
  const linkProps = href
    ? {
        href,
        target: '_blank',
        rel: 'noopener',
      }
    : {}

  return (
    <Tag
      className={cx(
        'news-clipping news-clipping--torn relative block px-5 py-5 md:px-7 md:py-6',
        href && 'transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-0.4deg]',
        className,
      )}
      style={{transform: `rotate(${rotate}deg)`}}
      {...linkProps}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 border-b border-current/30 pb-2">
        {source && (
          <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em]">
            {source}
          </p>
        )}
        {date && (
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            {date}
          </p>
        )}
      </div>
      {headline && (
        <h3 className="font-display mt-3 text-lg font-semibold leading-tight md:text-xl">
          {headline}
        </h3>
      )}
      {body && (
        <p className="mt-2 text-sm leading-snug text-[var(--ink-soft)]">{body}</p>
      )}
    </Tag>
  )
}
