//this file determines if dark mode is enabled or not
import React, {useState} from 'react'
import AppContext from './appContext'

const AppProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false) //uses useState to check if dark mode is enabled

  return (
    <AppContext.Provider value={{darkMode, setDarkMode}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
