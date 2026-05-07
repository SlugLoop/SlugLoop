'use client'

import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {cx} from './cx'

export default function Tooltip({children, content, className, side = 'top'}) {
  if (!content) return children

  return (
    <TooltipPrimitive.Provider delayDuration={120}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={8}
            className={cx(
              'z-[1000] max-w-64 rounded-xl border border-[var(--museum-card-border)] bg-[var(--color-paper)] px-3 py-2 text-sm text-[var(--color-text-primary)] shadow-xl',
              className,
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--color-paper)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
