import './App.css'
import {useEffect} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import Main from './Components/Main'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'
import {RouteProvider} from './Route'

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
  useEffect(() => {
    signIn()
  }, [])
  return (
    <RouteProvider>
      <RouterProvider router={router} />
    </RouteProvider>
  )
}

export default App
