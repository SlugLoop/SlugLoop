import React, {useEffect, useState} from 'react'
import AppContext from './appContext'

const THEME_STORAGE_KEY = 'slugloop-theme-mode'

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') {
    return true
  }

  const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedMode === 'dark') return true
  if (storedMode === 'light') return false

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true
}

const AppProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((isDarkMode) => !isDarkMode)
  }

  return (
    <AppContext.Provider value={{darkMode, setDarkMode, toggleDarkMode}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
