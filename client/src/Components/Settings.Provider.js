import SettingsContext from './SettingsContext'
import React, {useState} from 'react'
const SettingsProvider = ({children}) => {
  // Context state
  const [settings, setSettings] = useState(
    localStorage.getItem('settings')
      ? JSON.parse(localStorage.getItem('settings'))
      : {
          displayTime: true,
          darkMode: false,
          filter: true,
        },
  )

  // localStorage.setItem('settings', JSON.stringify(settings))
  // Call this, everytime settings change. This will update the localStorage
  // UseEffect

  return (
    <SettingsContext.Provider value={{settings, setSettings}}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
