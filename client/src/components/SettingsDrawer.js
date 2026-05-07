'use client'

import React, {useContext, useState} from 'react'
import {useRouter} from 'next/navigation'
import AppContext from '../appContext'
import Drawer from './ui/Drawer'
import {
  Clock,
  Info,
  ListFilter,
  Mail,
  Menu,
  Moon,
  Route,
  Sun,
} from 'lucide-react'
import {cx} from './ui/cx'

const navItems = [
  {label: 'Cover', path: '/', icon: Route},
  {label: 'Field log', path: '/journey', icon: Clock},
  {label: 'Crew', path: '/about', icon: Info},
  {label: 'Links', path: '/contact', icon: Mail},
]

function MenuButton({children, className, icon: Icon, onClick}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'museum-focus flex w-full items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-3 text-left font-mono text-[0.78rem] font-semibold uppercase tracking-[0.13em] transition hover:border-[var(--red-pen)] hover:bg-[var(--highlighter-soft)]',
        className,
      )}
    >
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  )
}

export default function SettingsDrawer(props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const {darkMode, toggleDarkMode} = useContext(AppContext)

  const navigate = (path) => {
    setDrawerOpen(false)
    router.push(path)
  }

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      title="Menu"
      description="Pages, settings, and the dark-mode toggle."
      trigger={
        <button
          type="button"
          aria-label="menu"
          className="museum-focus absolute right-[24px] top-[96px] z-[3] inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink)] shadow-[var(--museum-card-shadow)] transition hover:bg-[var(--highlighter-soft)]"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      }
    >
      <div className="space-y-5">
        <div>
          <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)] mb-2">
            // pages
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <MenuButton key={item.path} icon={item.icon} onClick={() => navigate(item.path)}>
                {item.label}
              </MenuButton>
            ))}
          </div>
        </div>

        <div className="h-px bg-[var(--museum-soft-divider)]" />

        <div>
          <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)] mb-2">
            // map settings
          </p>
          <div className="space-y-1">
            <MenuButton icon={Clock} onClick={props.toggleDisplayTime}>
              {props.displayTime ? 'Hide time' : 'Show time'}
            </MenuButton>
            <MenuButton icon={darkMode ? Sun : Moon} onClick={toggleDarkMode}>
              {darkMode ? 'Light mode' : 'Dark mode'}
            </MenuButton>
            <MenuButton icon={ListFilter} onClick={props.handleFilterToggle}>
              {props.filter ? 'Show past buses' : 'Show recent buses only'}
            </MenuButton>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
