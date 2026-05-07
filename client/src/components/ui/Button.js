import React from 'react'
import {cx} from './cx'

/**
 * Notebook-aesthetic button variants:
 *  - solid:   yellow "tape" button with a slight rotation and offset shadow
 *  - outline: inky bordered notebook stamp button
 *  - ghost:   underlined link-style button
 *  - map:     panel button used inside the map chrome
 */
const variantClasses = {
  solid:
    'tape-button border-0',
  outline:
    'border-2 border-[var(--ink)] bg-transparent text-[var(--ink)] font-mono uppercase tracking-[0.13em] hover:bg-[var(--highlighter-soft)] hover:-translate-y-0.5 transition',
  ghost:
    'border-0 bg-transparent text-[var(--ink)] font-mono uppercase tracking-[0.12em] underline-offset-[6px] decoration-[var(--ink-mute)] decoration-2 hover:underline hover:text-[var(--ocean)]',
  map:
    'border border-[var(--museum-card-border)] bg-[var(--paper-card)] text-[var(--ink)] hover:bg-[var(--highlighter-soft)] font-mono uppercase tracking-[0.13em]',
}

const sizeClasses = {
  sm: 'min-h-9 px-3 py-1.5 text-[0.7rem]',
  md: 'min-h-11 px-4 py-2 text-[0.78rem]',
  lg: 'min-h-12 px-5 py-3 text-[0.85rem]',
}

const baseClasses =
  'museum-focus inline-flex items-center justify-center gap-2 font-bold no-underline cursor-pointer disabled:pointer-events-none disabled:opacity-50'

export default function Button({
  children,
  className,
  variant = 'ghost',
  size = 'md',
  href,
  startIcon,
  endIcon,
  disabled = false,
  type = 'button',
  ...props
}) {
  const isSolid = variant === 'solid'
  const classes = cx(
    baseClasses,
    !isSolid && (sizeClasses[size] ?? sizeClasses.md),
    variantClasses[variant] ?? variantClasses.ghost,
    !isSolid && 'rounded-md',
    className,
  )

  const content = (
    <>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </>
  )

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {content}
    </button>
  )
}
