//App.js file manages routing, handles viewport width changes, and provides global context and theme management
import {useEffect, useState} from 'react' //managing side effects and state within functional components.
import {signIn} from './Components/Auth'
import Map from './Components/Map'
import {
  createBrowserRouter,
  RouterProvider,
  useOutlet,
  useLocation,
} from 'react-router-dom' //implements routing for SlugLoop.
import About from './Components/About/AboutUs'
import AboutDesktop from './Components/About/AboutUsDesktop'
import Contact from './Components/Contact'
import {RouteProvider} from './Route'
import MainMobile from './Components/Landing/MainMobile'
import MainDesktop from './Components/Landing/MainDesktop'
import MyTimeline from './Components/TimeLine/TimeLine'
import Wrapper from './Components/UIWrapper/Wrapper'
import {AnimatePresence, motion} from 'framer-motion'  //create animations in the SlugLoop

import AppContext from './appContext'
import AppProvider from './appProvider'
import {ThemeProvider} from '@mui/material/styles'
import {themeOptions} from './Components/Theme/theme'

//The animatedOutlet component wraps the content rendered by the router. 
//It uses the useOutlet hook to dynamically render content based on the 
//current route. 
//This component serves as a dynamic loader to be able to get the exit 
//animations to work. 
const AnimatedOutlet = () => {
  const o = useOutlet()
  const [outlet] = useState(o)

  return <>{outlet}</>
}


//The RootContainer component is used to manage route transitions with 
//animations using AnimatePresence and motion.div.
// It ensures smooth and visually appealing animation when route changes are happening. 
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


//this defines overall function of the app
function App() {
  const viewportWidth = useViewportWidth() //manages viewport width, handles resizing
  useEffect(() => {
    signIn()
  }, [])
  const router = createBrowserRouter([ //sets up routing
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
    <AppProvider>
      <AppContext.Consumer>
        {({darkMode}) => (
          <ThemeProvider theme={themeOptions(darkMode)}>
            <RouteProvider>
              <RouterProvider router={router} />
            </RouteProvider>
          </ThemeProvider>
        )}
      </AppContext.Consumer>
    </AppProvider>
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
//export App for easy access from other files