import React, {useState} from 'react'
import AppContext from './appContext'

const AppProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <AppContext.Provider value={{darkMode, setDarkMode}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
