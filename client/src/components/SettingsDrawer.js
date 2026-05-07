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
  {label: 'Story', path: '/', icon: Route},
  {label: 'Archive', path: '/timeline', icon: Clock},
  {label: 'Links', path: '/contact', icon: Mail},
  {label: 'Team', path: '/about', icon: Info},
]

function MenuButton({children, className, icon: Icon, onClick}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'museum-focus flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left font-semibold transition hover:bg-[color-mix(in_srgb,var(--color-secondary),transparent_88%)]',
        className,
      )}
    >
      {Icon && <Icon size={19} aria-hidden="true" />}
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
      trigger={
        <button
          type="button"
          aria-label="menu"
          className="museum-focus absolute right-[30px] top-[90px] z-[3] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-primary)] shadow-[var(--museum-card-shadow)]"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      }
    >
      <div className="space-y-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <MenuButton key={item.path} icon={item.icon} onClick={() => navigate(item.path)}>
              {item.label}
            </MenuButton>
          ))}
        </div>

        <div className="h-px bg-[var(--museum-soft-divider)]" />

        <div className="space-y-1">
          <MenuButton icon={Clock} onClick={props.toggleDisplayTime}>
            {props.displayTime ? 'Hide Time' : 'Show Time'}
          </MenuButton>
          <MenuButton icon={darkMode ? Sun : Moon} onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </MenuButton>
          <MenuButton icon={ListFilter} onClick={props.handleFilterToggle}>
            {props.filter ? 'Show Past Buses' : 'Show Recent Buses'}
          </MenuButton>
        </div>
      </div>
    </Drawer>
  )
}
