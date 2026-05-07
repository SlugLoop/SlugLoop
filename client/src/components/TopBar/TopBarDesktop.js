'use client'

import React, {useContext} from 'react'
import {useRouter} from 'next/navigation'
import AppContext from '../../appContext'
import Button from '../ui/Button'
import {Moon, Sun} from '../ui/icons'

const navItems = [
  {label: 'Story', path: '/'},
  {label: 'Archive', path: '/timeline'},
  {label: 'Team', path: '/about'},
  {label: 'Links', path: '/contact'},
]

export default function DesktopTopBar() {
  const router = useRouter()

  const {darkMode, toggleDarkMode} = useContext(AppContext)

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 md:px-6">
      <nav className="museum-appbar mx-auto flex min-h-[64px] max-w-[1480px] items-center rounded-full px-5 lg:px-7">
        <div className="flex flex-1 items-center gap-3">
          <span className="museum-dot h-3 w-3" aria-hidden="true" />
          <button
            type="button"
            onClick={() => router.push('/')}
            className="museum-focus font-display text-2xl font-extrabold tracking-[-0.05em]"
          >
            SlugLoop
          </button>
          <span className="type-caption hidden rounded-full border border-[var(--museum-soft-divider)] px-2.5 py-1 uppercase tracking-[0.18em] text-muted lg:inline-flex">
            Transit archive
          </span>
        </div>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              href={item.path}
              variant="ghost"
            >
              {item.label}
            </Button>
          ))}
          <Button
            href="/map"
            variant="solid"
          >
            Open map
          </Button>
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="museum-focus inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-primary)] transition hover:bg-[color-mix(in_srgb,var(--color-secondary),transparent_88%)]"
          >
            {darkMode ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  )
}
