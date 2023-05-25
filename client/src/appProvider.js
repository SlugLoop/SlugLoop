import React, {useState} from 'react'
import AppContext from './appContext'

const AppProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <AppContext.Provider value={{isDarkMode, setIsDarkMode}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
