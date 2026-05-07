'use client'

import React from 'react'

const AppContext = React.createContext({
  darkMode: true,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
})

export default AppContext