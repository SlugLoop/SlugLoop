'use client'

import React, {useContext} from 'react'
import {usePathname} from 'next/navigation'
import AppContext from '../../appContext'
import Button from '../ui/Button'
import SlugDoodle from '../ui/SlugDoodle'
import {cx} from '../ui/cx'
import {ArrowRight, Moon, Sun} from '../ui/icons'

const navItems = [
  {label: 'Cover', path: '/'},
  {label: 'Field log', path: '/journey'},
  {label: 'Crew', path: '/about'},
  {label: 'Links', path: '/contact'},
]

function isPathActive(pathname, target) {
  if (target === '/') return pathname === '/'
  if (target === '/journey') {
    return pathname === '/journey' || pathname === '/timeline'
  }
  return pathname === target || pathname.startsWith(`${target}/`)
}

export default function DesktopTopBar() {
  const pathname = usePathname() ?? '/'
  const {darkMode, toggleDarkMode} = useContext(AppContext)

  return (
    <header className="sticky top-0 z-40 px-6 pt-4 pb-0 md:px-10">
      <div className="mx-auto flex max-w-[1480px] items-end justify-between border-b-2 border-[var(--ink)]">
        <a href="/" className="museum-focus flex items-end gap-3 pb-3 no-underline">
          <SlugDoodle size={42} className="text-[var(--ocean)]" />
          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-3xl font-semibold tracking-[-0.02em]">
              SlugLoop.
            </span>
            <span className="type-hand text-[1.05rem] text-[var(--ink-soft)] -mt-1">
              field notes &middot; ucsc &middot; 2023
            </span>
          </span>
        </a>

        <div className="flex items-end gap-2">
          <nav className="flex items-end gap-1" aria-label="Primary">
            {navItems.map((item) => {
              const active = isPathActive(pathname, item.path)
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={cx(
                    'folder-tab no-underline',
                    active && 'folder-tab--active',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="ml-3 flex items-end gap-3 pb-2">
            <Button
              href="/map"
              variant="solid"
              endIcon={<ArrowRight size={14} />}
            >
              Open map
            </Button>
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink)] transition hover:bg-[var(--highlighter-soft)]"
            >
              {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
