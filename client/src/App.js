import './App.css'
import {useEffect} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map />,
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
  useEffect(() => {
    signIn()
  }, [])
  return <RouterProvider router={router} />
}

export default App
