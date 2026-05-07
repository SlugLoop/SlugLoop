'use client'

import React from 'react'
import {resourceLinks} from './slugloopMuseumData'
import Button from './ui/Button'
import Chip from './ui/Chip'
import {ExternalLink} from './ui/icons'

export default function Contact() {
  return (
    <main className="museum-page-alt min-h-screen px-5 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mb-12 max-w-[860px] space-y-5 md:mb-20">
        <Chip label="Links and resources" />
        <h1 className="type-display-1">Browse the SlugLoop archive.</h1>
        <p className="type-heading-5 text-muted">
          The old contact form depended on a maintained backend. This archive
          now points visitors toward the preserved demo, source code, press, and
          original project pages without collecting messages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {resourceLinks.map((link) => (
          <article key={link.href} className="museum-static-card rounded-2xl p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="type-heading-5 text-[var(--color-text-primary)]">{link.label}</h2>
                <p className="text-sm text-muted">
                  {link.internal ? 'Internal SlugLoop route' : link.href}
                </p>
              </div>
              <Button
                href={link.href}
                target={link.internal ? undefined : '_blank'}
                rel={link.internal ? undefined : 'noopener'}
                variant={link.internal ? 'solid' : 'outline'}
                endIcon={link.internal ? undefined : <ExternalLink size={16} />}
              >
                Open
              </Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
