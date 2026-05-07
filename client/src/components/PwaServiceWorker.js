'use client'

import {useEffect} from 'react'

const SERVICE_WORKER_URL = '/sw.js'

function unregisterLocalServiceWorkers() {
  if (!navigator.serviceWorker.getRegistrations) {
    return
  }

  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        const worker =
          registration.active || registration.waiting || registration.installing

        if (
          registration.scope === `${window.location.origin}/` ||
          worker?.scriptURL.endsWith(SERVICE_WORKER_URL)
        ) {
          registration.unregister()
        }
      })
    })
    .catch(() => undefined)
}

export default function PwaServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return
    }

    if (process.env.NODE_ENV !== 'production') {
      unregisterLocalServiceWorkers()
      return
    }

    const hadController = Boolean(navigator.serviceWorker.controller)
    let hasRefreshedForUpdate = false
    const handleControllerChange = () => {
      if (!hadController || hasRefreshedForUpdate) {
        return
      }

      hasRefreshedForUpdate = true
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    navigator.serviceWorker
      .register(SERVICE_WORKER_URL, {scope: '/', updateViaCache: 'none'})
      .then((registration) => {
        console.log('[Service Worker] Registered')
        registration.update().catch(() => undefined)
      })
      .catch(() => {
        console.log('[Service Worker] Failed')
      })

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
    }
  }, [])

  return null
}
