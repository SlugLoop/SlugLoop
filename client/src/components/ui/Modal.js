'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {X} from 'lucide-react'
import Button from './Button'
import {cx} from './cx'

export default function Modal({children, className, description, open, onOpenChange, title, trigger}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" />
        <Dialog.Content
          className={cx(
            'museum-static-card fixed left-1/2 top-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6 shadow-2xl outline-none',
            className,
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
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
              <Button variant="ghost" size="sm" aria-label="Close modal" className="h-10 w-10 px-0">
                <X size={18} aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
