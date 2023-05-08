import {createContext, useState} from 'react'

export const RouteContext = createContext()

export const RouteProvider = ({children}) => {
  const [selectedRoute, setSelectedRoute] = useState('')

  return (
    <RouteContext.Provider value={[selectedRoute, setSelectedRoute]}>
      {children}
    </RouteContext.Provider>
  )
}
