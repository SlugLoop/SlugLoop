'use client'

import {useEffect} from 'react'
import {RouteProvider} from '../src/Route'
import PwaServiceWorker from '../src/components/PwaServiceWorker'
import AppProvider from '../src/appProvider'

function AuthBootstrap() {
  useEffect(() => {
    import('../src/components/Auth')
      .then(({signIn}) => signIn())
      .catch((error) => {
        console.warn('[SlugLoop] Anonymous Firebase sign-in failed', error)
      })
  }, [])

  return null
}

function ClientRuntime({children}) {
  return (
    <RouteProvider>
      <AuthBootstrap />
      <PwaServiceWorker />
      {children}
    </RouteProvider>
  )
}

export default function Providers({children}) {
  return (
    <AppProvider>
      <ClientRuntime>{children}</ClientRuntime>
    </AppProvider>
  )
}
