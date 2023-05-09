import {createContext, useState} from 'react'

export const RouteContext = createContext()

export const RouteProvider = ({children}) => {
  const [selectedRoute, setSelectedRoute] = useState([
    'LOOP',
    'UPPER CAMPUS',
    'LOOP OUT OF SERVICE AT BARN THEATER',
    'EAST NIGHT CORE',
    'OUT OF SERVICE/SORRY',
  ])

  return (
    <RouteContext.Provider value={[selectedRoute, setSelectedRoute]}>
      {children}
    </RouteContext.Provider>
  )
}
