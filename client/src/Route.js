import {createContext, useState} from 'react' // imports createContext and useState functions from the react library

export const RouteContext = createContext() // creates a new context object RouteContext
/**
 * RouteProvider is a function that takes any children components as a parameter and encapsulates the the state related to routes,
 * making it available to any child component that needs access to the data 
 * @param children - any potential descendants of Route Provider
 * @returns value - provides the selected Route state and updates it using the setSelectedRoute
 */
export const RouteProvider = ({children}) => { // defines a function Route Provider
  const [selectedRoute, setSelectedRoute] = useState([
    'LOOP',
    'UPPER CAMPUS',
    'LOOP OUT OF SERVICE AT BARN THEATER',
    'EAST NIGHT CORE',
    'OUT OF SERVICE/SORRY',
    'SPECIAL',
  ]) // initalizes a state variable selectedRoute using the useState hook

  return (
    <RouteContext.Provider value={[selectedRoute, setSelectedRoute]}>
      {children}
    </RouteContext.Provider>
  ) // returns the RouteContext.Provider component, which is a an array of selectedRoute and the updater function setSelectedRoute
}
