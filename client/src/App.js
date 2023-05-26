import {useEffect, useState} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About/AboutUs'
import Contact from './Components/Contact'
import {RouteProvider} from './Route'
import Main from './Components/Landing/Main'
import MyTimeline from './Components/TimeLine/TimeLine'
import Wrapper from './Components/UIWrapper/Wrapper'

function App() {
  const viewportWidth = useViewportWidth()
  useEffect(() => {
    signIn()
  }, [])
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Wrapper>
          <Main />
        </Wrapper>
      ),
    },
    {
      path: '/timeline',
      element: (
        <Wrapper>
          <MyTimeline />
        </Wrapper>
      ),
    },
    {
      path: '/map',
      element: <Map />,
    },
    {
      path: '/about',
      element: (
        <Wrapper>
          <About />
        </Wrapper>
      ),
    },
    {
      path: '/contact',
      element: (
        <Wrapper>
          <Contact />
        </Wrapper>
      ),
    },
  ])
  return (
    <RouteProvider>
      <RouterProvider router={router} />
    </RouteProvider>
  )
}
const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(null)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewportWidth
}

export default App
