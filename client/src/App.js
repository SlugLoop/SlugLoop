
import {useEffect, useReducer, useState} from 'react'
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {
  createBrowserRouter,
  RouterProvider,
  useOutlet,
  useLocation,
} from 'react-router-dom'
import About from './Components/About/AboutUs'
import AboutDesktop from './Components/About/AboutUsDesktop'
import Contact from './Components/Contact'
import SettingsContext from './SettingsContext'
import {SettingsReducer, INITIAL_STATE} from './SettingsReducer'
import {RouteProvider} from './Route'
import MainMobile from './Components/Landing/MainMobile'
import MainDesktop from './Components/Landing/MainDesktop'
import MyTimeline from './Components/TimeLine/TimeLine'
import Wrapper from './Components/UIWrapper/Wrapper'
import {AnimatePresence, motion} from 'framer-motion'

const AnimatedOutlet = () => {
  const o = useOutlet()
  const [outlet] = useState(o)

  return <>{outlet}</>
}

const RootContainer = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={location.pathname}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
        <AnimatedOutlet />
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
   
  const [settings, dispatch] = useReducer(SettingsReducer, INITIAL_STATE);
  const providerState = {
    settings, dispatch
  }
  console.log(settings)
  const viewportWidth = useViewportWidth()
  useEffect(() => {
    signIn()
  }, [])
  const router = createBrowserRouter([
    {
      element: <RootContainer />,
      children: [
        {
          index: true,
          element: (
            <Wrapper>
              {viewportWidth > 600 ? <MainDesktop /> : <MainMobile />}
            </Wrapper>
          ),
        },
        {
          path: 'timeline',
          element: (
            <Wrapper>
              <MyTimeline />
            </Wrapper>
          ),
        },
        {
          path: 'map',
          element: <Map />,
        },
        {
          path: 'about',
          element: (
            <Wrapper>
              {viewportWidth > 600 ? <AboutDesktop /> : <About />}
            </Wrapper>
          ),
        },
        {
          path: 'contact',
          element: (
            <Wrapper>
              <Contact />
            </Wrapper>
          ),
        },
      ],
    },
  ])
  // I dont know why there needs to be two RouteProviders, but it doesnt work without two
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
