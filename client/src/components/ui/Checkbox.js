'use client'

import React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {Check} from 'lucide-react'
import {cx} from './cx'

export default function Checkbox({checked, className, disabled, id, label, onCheckedChange}) {
  return (
    <label
      className={cx(
        'flex cursor-pointer select-none items-center gap-3 rounded-2xl px-2 py-1 text-sm font-semibold text-[var(--color-text-primary)]',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      htmlFor={id}
    >
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className="museum-focus flex h-5 w-5 items-center justify-center rounded-md border border-[var(--museum-card-border)] bg-[color-mix(in_srgb,var(--color-paper),transparent_20%)] data-[state=checked]:border-[var(--color-secondary)] data-[state=checked]:bg-[var(--color-secondary)] data-[state=checked]:text-[var(--color-secondary-contrast)]"
      >
        <CheckboxPrimitive.Indicator>
          <Check size={14} strokeWidth={3} aria-hidden="true" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span>{label}</span>}
    </label>
  )
}
