'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {X} from 'lucide-react'
import Button from './Button'
import {cx} from './cx'

export default function Drawer({
  children,
  className,
  contentClassName,
  description,
  open,
  onOpenChange,
  side = 'right',
  title,
  trigger,
}) {
  const placement = side === 'left' ? 'left-0 border-r' : 'right-0 border-l'

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" />
        <Dialog.Content
          className={cx(
            'museum-drawer fixed top-0 z-50 flex h-dvh w-[min(88vw,360px)] flex-col gap-5 p-5 shadow-2xl outline-none',
            placement,
            className,
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && (
                <Dialog.Title className="font-display text-2xl font-extrabold tracking-[-0.03em]">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="mt-1 text-sm text-muted">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm" aria-label="Close drawer" className="h-10 w-10 px-0">
                <X size={18} aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>
          <div className={cx('min-h-0 flex-1 overflow-y-auto', contentClassName)}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
