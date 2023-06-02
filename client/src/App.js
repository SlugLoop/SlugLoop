
import {useEffect, useReducer, useState} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import About from './Components/About/AboutUs'
import AboutDesktop from './Components/About/AboutUsDesktop'
import Contact from './Components/Contact'
import SettingsContext from './Components/SettingsContext'
import {SettingsReducer, INITIAL_STATE} from './Components/SettingsReducer'
import {RouteProvider} from './Route'
import MainMobile from './Components/Landing/MainMobile'
import MainDesktop from './Components/Landing/MainDesktop'
import MyTimeline from './Components/TimeLine/TimeLine'
import Wrapper from './Components/UIWrapper/Wrapper'

function App() {
   
  const [settings, dispatch] = useReducer(SettingsReducer, INITIAL_STATE);
  const providerState = {
    settings, dispatch
  }
  const viewportWidth = useViewportWidth()
  useEffect(() => {
    signIn()
  }, [])
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Wrapper>
          {viewportWidth > 600 ? <MainDesktop /> : <MainMobile />}
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
        <Wrapper>{viewportWidth > 600 ? <AboutDesktop /> : <About />}</Wrapper>
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
    <SettingsContext.Provider value={providerState}>
      <RouteProvider>
        <RouterProvider router={router} />
      </RouteProvider>
    </SettingsContext.Provider>
  )
}

export const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewportWidth
}

export default App
