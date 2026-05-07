import React from 'react'
import {cx} from './cx'

const toneClass = {
  secondary:
    'border-[color-mix(in_srgb,var(--highlighter-deep),transparent_45%)] bg-[var(--highlighter-soft)] text-[var(--ink)]',
  primary:
    'border-[color-mix(in_srgb,var(--ocean),transparent_55%)] bg-[color-mix(in_srgb,var(--ocean),transparent_84%)] text-[var(--ocean-dark)]',
  ink:
    'border-[var(--ink)] bg-transparent text-[var(--ink)]',
  red:
    'border-[var(--red-pen)] bg-[var(--red-pen-soft)] text-[var(--red-pen)]',
}

export default function Chip({children, label, className, tone = 'secondary', ...props}) {
  return (
    <span
      className={cx(
        'inline-flex w-fit items-center gap-2 rounded-md border px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em]',
        toneClass[tone] ?? toneClass.secondary,
        className,
      )}
      {...props}
    >
      {label ?? children}
    </span>
  )
}
