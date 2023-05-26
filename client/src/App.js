import './App.css'
import {useEffect, useReducer} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import Main from './Components/Main'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'
import SettingsContext from './Components/SettingsContext'
import {SettingsReducer, INITIAL_STATE} from './Components/SettingsReducer'

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
  
  const [settings, dispatch] = useReducer(SettingsReducer, INITIAL_STATE);
  const providerState = {
    settings, dispatch
  }
  useEffect(() => {
    signIn()
  }, [])
  /*
  useEffect(()=>{
    settings.displayTime = localStorage.getItem('displayTime')? localStorage.getItem('displayTime'):false
    settings.darkMode= localStorage.getItem('darkMode')? localStorage.getItem('darkMode'):false
    settings.filter= localStorage.getItem('filter')? localStorage.getItem('filter'):false
    settings.path= localStorage.getItem('path')? localStorage.getItem('path'):true
    settings.showMap= localStorage.getItem('showMap')? localStorage.getItem('showMap'):true
    settings.displayUCSC= localStorage.getItem('displayUCSC')? localStorage.getItem('displayUCSC'):true
  })
  */
  return (
    <SettingsContext.Provider value = {providerState}>
      <RouterProvider router={router} />
    </SettingsContext.Provider>
  )
}

export default App
