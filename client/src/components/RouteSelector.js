'use client'

import React, {useContext, useState} from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import {Bus, ChevronDown, ChevronRight} from 'lucide-react'
import {RouteContext} from '../Route'
import routeColors from './bus.json'
import Checkbox from './ui/Checkbox'
import Drawer from './ui/Drawer'

const metroRoutes = ['3A', '3B', '18', '19', '20']
const loopRoutes = [
  'LOOP',
  'UPPER CAMPUS',
  'LOOP OUT OF SERVICE AT BARN THEATER',
  'OUT OF SERVICE/SORRY',
  'SPECIAL',
]

function RouteGroup({name, open, routes, selectedRoute, setOpen, setSelectedRoute}) {
  const isOpen = open === name

  const toggleRoute = (route) => {
    if (selectedRoute.includes(route)) {
      setSelectedRoute(selectedRoute.filter((r) => r !== route))
    } else {
      setSelectedRoute([...selectedRoute, route])
    }
  }

  return (
    <Collapsible.Root open={isOpen} onOpenChange={() => setOpen(isOpen ? '' : name)}>
      <Collapsible.Trigger className="museum-focus flex w-full items-center justify-between rounded-md border-l-2 border-transparent px-3 py-3 font-mono text-[0.8rem] font-bold uppercase tracking-[0.16em] transition hover:border-[var(--red-pen)] hover:bg-[var(--highlighter-soft)]">
        <span>{name}</span>
        {isOpen ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}
      </Collapsible.Trigger>
      <Collapsible.Content className="space-y-1 px-1 pb-2 pt-1">
        {routes.map((route) => (
          <div key={route} className="flex items-center justify-between gap-2 rounded-md py-1 pl-1 pr-2">
            <Checkbox
              id={`route-${route.replace(/\W+/g, '-').toLowerCase()}`}
              checked={selectedRoute.includes(route)}
              onCheckedChange={() => toggleRoute(route)}
              label={route}
              className="min-w-0 flex-1"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={routeColors[route]} alt="bus icon" className="h-5 w-5 flex-shrink-0" />
          </div>
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export default function RouteSelector() {
  const [selectedRoute, setSelectedRoute] = useContext(RouteContext)
  const [open, setOpen] = useState('')
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={setDrawerOpen}
      title="Bus routes"
      description="Filter the map by loop bus route or Metro line."
      trigger={
        <button
          type="button"
          aria-label="bus route filter"
          className="museum-focus absolute right-[24px] top-[24px] z-[3] inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)] text-[var(--ink)] shadow-[var(--museum-card-shadow)] transition hover:bg-[var(--highlighter-soft)]"
        >
          <Bus size={20} aria-hidden="true" />
        </button>
      }
    >
      <div className="space-y-3">
        <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          // toggle routes
        </p>
        <RouteGroup
          name="Loop"
          routes={loopRoutes}
          open={open}
          setOpen={setOpen}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
        <RouteGroup
          name="Metro"
          routes={metroRoutes}
          open={open}
          setOpen={setOpen}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
        <button
          type="button"
          onClick={() => setSelectedRoute([])}
          className="museum-focus w-full rounded-md border-l-2 border-transparent px-3 py-3 text-left font-mono text-[0.78rem] font-bold uppercase tracking-[0.16em] transition hover:border-[var(--red-pen)] hover:bg-[var(--highlighter-soft)]"
        >
          Clear routes
        </button>
      </div>
    </Drawer>
  )
}
