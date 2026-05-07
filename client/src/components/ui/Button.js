import React from 'react'
import {cx} from './cx'

const variantClasses = {
  solid: 'border-transparent bg-[linear-gradient(135deg,var(--color-secondary),var(--color-secondary-light))] text-[var(--color-secondary-contrast)] shadow-[0_16px_42px_color-mix(in_srgb,var(--color-secondary),transparent_72%)] hover:-translate-y-0.5 hover:shadow-[0_22px_54px_color-mix(in_srgb,var(--color-secondary),transparent_66%)]',
  outline: 'border-[var(--museum-card-border)] bg-[color-mix(in_srgb,var(--color-paper),transparent_70%)] text-[var(--color-text-primary)] backdrop-blur hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-primary),transparent_48%)] hover:bg-[color-mix(in_srgb,var(--color-primary),transparent_88%)]',
  ghost: 'border-transparent bg-transparent text-[var(--color-text-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary),transparent_88%)]',
  map: 'border-[var(--museum-card-border)] bg-[var(--museum-map-panel-background)] text-[var(--museum-map-panel-text)] hover:bg-[color-mix(in_srgb,var(--color-primary),transparent_86%)]',
}

const sizeClasses = {
  sm: 'min-h-9 px-3 py-1.5 text-xs',
  md: 'min-h-11 px-4 py-2 text-sm',
  lg: 'min-h-12 px-5 py-3 text-base',
}

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
  const classes = cx(
    'museum-focus inline-flex items-center justify-center gap-2 rounded-full border font-bold tracking-[0.01em] no-underline transition duration-300',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant] ?? variantClasses.ghost,
    sizeClasses[size] ?? sizeClasses.md,
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
