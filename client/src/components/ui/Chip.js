import React from 'react'
import {cx} from './cx'

export default function Chip({children, label, className, tone = 'secondary', ...props}) {
  return (
    <span
      className={cx(
        'inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em]',
        tone === 'secondary'
          ? 'border-[color-mix(in_srgb,var(--color-secondary),transparent_45%)] bg-[color-mix(in_srgb,var(--color-secondary),transparent_84%)] text-[var(--color-secondary)]'
          : 'border-[color-mix(in_srgb,var(--color-primary),transparent_45%)] bg-[color-mix(in_srgb,var(--color-primary),transparent_84%)] text-[var(--color-primary-light)]',
        className,
      )}
      {...props}
    >
      {label ?? children}
    </span>
  )
}
