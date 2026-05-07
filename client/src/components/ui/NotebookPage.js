'use client'

import React from 'react'
import {cx} from './cx'

/**
 * Notebook-style content card. Cream paper, dotted graph background, optional
 * red ruled-margin line on the left, and an optional spiral binding.
 */
export default function NotebookPage({
  children,
  margin = false,
  binding = false,
  className,
  innerClassName,
  ...props
}) {
  return (
    <article
      className={cx(
        'notebook-page',
        margin && 'notebook-page--margin',
        'relative px-6 py-8 md:px-10 md:py-10',
        className,
      )}
      {...props}
    >
      {binding && <span className="binding-spiral" aria-hidden="true" />}
      <div className={cx(margin ? 'pl-4 md:pl-10' : '', innerClassName)}>{children}</div>
    </article>
  )
}
