import './App.css'
import {useEffect, useReducer} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import Main from './Components/Main'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'
import SettingsContext from './Components/SettingsContext'
import SettingsReducer from './Components/SettingsReducer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
])

function App() {
  const initialState = []
  const [settings, dispatch] = useReducer(SettingsReducer, initialState);
  const providerState = {
    settings, dispatch
  }
  useEffect(() => {
    signIn()
  }, [])
  return (
    <SettingsContext.Provider value = {providerState}>
      <RouterProvider router={router} />
    </SettingsContext.Provider>
  )
}

export default App
