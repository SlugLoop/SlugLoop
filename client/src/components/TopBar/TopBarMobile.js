'use client'

import React, {useContext, useState} from 'react'
import {usePathname} from 'next/navigation'
import {AnimatePresence, motion} from 'framer-motion'
import AppContext from '../../appContext'
import Button from '../ui/Button'
import SlugDoodle from '../ui/SlugDoodle'
import {cx} from '../ui/cx'
import {ArrowRight, Menu, Moon, Sun, X} from '../ui/icons'

const MotionDiv = motion.create('div')

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

export default function MobileTopBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const {darkMode, toggleDarkMode} = useContext(AppContext)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 px-4 pt-3">
        <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-2">
          <a href="/" className="museum-focus flex items-end gap-2 no-underline">
            <SlugDoodle size={32} className="text-[var(--ocean)]" />
            <span className="font-display text-2xl font-semibold leading-none tracking-[-0.02em]">
              SlugLoop.
            </span>
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink)]"
            >
              {darkMode ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="toggle navigation"
              className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink)]"
            >
              {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{opacity: 0, y: -16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -16}}
            transition={{duration: 0.22}}
            className="fixed inset-0 z-40 bg-[var(--paper)] px-6 pt-24"
          >
            <div className="paper-grid" />
            <div className="paper-grain" />
            <div className="relative z-[1] flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const active = isPathActive(pathname, item.path)
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={handleClose}
                      className={cx(
                        'folder-tab w-full no-underline',
                        active && 'folder-tab--active',
                      )}
                      aria-current={active ? 'page' : undefined}
                      style={{borderRadius: '10px'}}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>

              <div className="mt-2 flex items-center gap-3">
                <Button
                  variant="solid"
                  href="/map"
                  onClick={handleClose}
                  endIcon={<ArrowRight size={14} />}
                >
                  Open map
                </Button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  )
}
