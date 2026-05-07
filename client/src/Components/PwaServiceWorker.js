'use client'

import {useEffect} from 'react'

export default function PwaServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return
    }

    navigator.serviceWorker
      .register('/sw.js', {scope: '/', updateViaCache: 'none'})
      .then(() => {
        console.log('[Service Worker] Registered')
      })
      .catch(() => {
        console.log('[Service Worker] Failed')
      })
  }, [])

  return null
}
