'use client'

import React, {useEffect, useState} from 'react'
import AppContext from './appContext'

const THEME_STORAGE_KEY = 'slugloop-theme-mode'

const applyDocumentTheme = (isDarkMode) => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light'
}

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedMode === 'dark') return true
  if (storedMode === 'light') return false

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

const AppProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const initialDarkMode = getInitialDarkMode()
    setDarkMode(initialDarkMode)
    applyDocumentTheme(initialDarkMode)
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    applyDocumentTheme(darkMode)
    window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode, hasHydrated])

  const toggleDarkMode = () => {
    setDarkMode((isDarkMode) => {
      const nextMode = !isDarkMode
      if (typeof window !== 'undefined') {
        applyDocumentTheme(nextMode)
        window.localStorage.setItem(THEME_STORAGE_KEY, nextMode ? 'dark' : 'light')
      }
      return nextMode
    })
  }

  return (
    <AppContext.Provider value={{darkMode, setDarkMode, toggleDarkMode}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
