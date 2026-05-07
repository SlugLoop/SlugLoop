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
    <header className="museum-appbar sticky top-0 z-40">
      <nav className="flex min-h-[72px] items-center px-8 lg:px-16">
        <div className="flex flex-1 items-center gap-3">
          <span className="museum-dot h-3 w-3" aria-hidden="true" />
          <button
            type="button"
            onClick={() => router.push('/')}
            className="museum-focus font-display text-2xl font-extrabold tracking-[-0.03em]"
          >
            SlugLoop
          </button>
          <span className="type-caption text-muted">
            Archive
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
