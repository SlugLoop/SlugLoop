import {useEffect} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About'
import Contact from './Components/Contact'
import {RouteProvider} from './Route'
import Main from './Components/Landing/Main'
import MyTimeline from './Components/TimeLine/TimeLine'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/timeline',
    element: <MyTimeline />,
  },
  {
    path: '/map',
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
  return (
    <RouteProvider>
      <RouterProvider router={router} />
    </RouteProvider>
  )
}

export default App
