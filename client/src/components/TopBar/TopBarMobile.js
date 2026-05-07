'use client'

import React, {useContext} from 'react'
import {useRouter} from 'next/navigation'
import {AnimatePresence, motion} from 'framer-motion'
import AppContext from '../../appContext'
import Button from '../ui/Button'
import {Menu, Moon, Sun, X} from '../ui/icons'

const MotionDiv = motion.create('div')

const navItems = [
  {label: 'Story', path: '/'},
  {label: 'Archive', path: '/timeline'},
  {label: 'Team', path: '/about'},
  {label: 'Links', path: '/contact'},
  {label: 'Open map', path: '/map', primary: true},
]

export default function MobileTopBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const {darkMode, toggleDarkMode} = useContext(AppContext)

  const handlePageChange = (path) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <>
      <header className="museum-appbar sticky top-0 z-50">
        <nav className="flex min-h-[68px] items-center px-4">
          <div className="flex flex-1 items-center gap-2.5">
            <span className="museum-dot h-2.5 w-2.5" aria-hidden="true" />
            <button
              type="button"
              onClick={() => router.push('/')}
              className="museum-focus font-display text-2xl font-extrabold tracking-[-0.03em]"
            >
              SlugLoop
            </button>
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="museum-focus inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[color-mix(in_srgb,var(--color-secondary),transparent_88%)]"
          >
            {darkMode ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="toggle navigation"
            className="museum-focus inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[color-mix(in_srgb,var(--color-secondary),transparent_88%)]"
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{opacity: 0, y: -16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -16}}
            transition={{duration: 0.24}}
            className="fixed inset-0 z-40 bg-[var(--color-bg)] px-6 pt-28"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handlePageChange(item.path)}
                  variant={item.primary ? 'solid' : 'outline'}
                  size="lg"
                  className="justify-start"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  )
}
