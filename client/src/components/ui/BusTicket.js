'use client'

import React from 'react'
import {cx} from './cx'

export default function BusTicket({
  serial,
  label,
  title,
  body,
  href,
  external = false,
  className,
  children,
  ...props
}) {
  const Tag = href ? 'a' : 'div'
  const linkProps = href
    ? {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noopener' : undefined,
      }
    : {}

  return (
    <Tag
      className={cx(
        'bus-ticket relative block rounded-md px-6 py-5',
        href && 'transition-transform duration-200 hover:-translate-y-0.5',
        className,
      )}
      {...linkProps}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {label && (
            <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
              {label}
            </p>
          )}
          {title && (
            <p className="font-display mt-1 text-lg font-semibold leading-tight">{title}</p>
          )}
          {body && (
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{body}</p>
          )}
          {children}
        </div>
        {serial && (
          <div className="ml-auto pl-3 border-l border-dashed border-[var(--museum-card-border)] flex flex-col items-end justify-center min-w-[88px]">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
              No.
            </p>
            <p className="font-mono text-base font-semibold tracking-[0.06em]">{serial}</p>
          </div>
        )}
      </div>
    </Tag>
  )
}
