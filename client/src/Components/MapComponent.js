import React, {useState, useEffect, useContext, useRef} from 'react'
import {getAllBuses, getAllMetroBuses} from './firebase'
import GoogleMap from 'google-maps-react-markers'
import {Box, Modal} from '@mui/material'
import MapMarker from './MapMarker'
import BusStopMarker from './BusStopMarker'
import {isBusUpdatedWithinPast30Minutes} from './helper'
import RouteSelector from './RouteSelector'
import MainWizard from './Wizard/MainWizard'
import InstallPWAButton from './PwaButton'
import SettingsDrawer from './SettingsDrawer'
import SettingsContext from '../SettingsContext'
import busStops from './bus-stops.json'
import {AnimatePresence} from 'framer-motion'
import {loopPath, upperCampusPath} from './PolylinePoints'
import Page from './Page'
import {getSoonBusStops} from './firebase'

export default function MapComponent({center, zoom}) {
  const [displayTime, setDisplayTime] = useState(true)
  const {settings} = useContext(SettingsContext)

  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  // Wizard State
  const [wizardOpen, setWizardOpen] = useState(
    localStorage.getItem('wizard') !== 'false',
  )

  // Stores the buses in a state variable to rerender

  const [buses, setBuses] = useState([])
  const [metroBuses, setMetroBuses] = useState([])
  const combinedBuses = buses.concat(metroBuses)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [stop, displayStop] = useState('')
  const [soon, setSoon] = useState(false)
  const [metroId, setMetroId] = useState('')
  const [name, setName] = useState('')
  const [isClockwise, setDirection] = useState(true)
  const [soonStops, setSoonStops] = useState([])
  const cwStops = busStops.bstop.CW
  const ccwStops = busStops.bstop.CCW
  function toggleDisplayTime() {
    setDisplayTime(!displayTime)
  }

  function handleFilterToggle() {
    setFilter(!filter)
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  useEffect(() => {
    let interval, interval2

    const fetchData = () => {
      getAllBuses().then((busses) => {
        setBuses(busses)
      })
    }
    const fetchMetroData = () => {
      getAllMetroBuses().then((buses) => {
        setMetroBuses(buses)
      })
    }

    const setupIntervals = () => {
      // Update positions of markers every 5 seconds
      interval = setInterval(fetchData, 5000)
      interval2 = setInterval(fetchMetroData, 12000)
    }

    const clearIntervals = () => {
      clearInterval(interval)
      clearInterval(interval2)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData()
        fetchMetroData()
        clearIntervals() // Clear existing intervals
        setupIntervals() // Set up new intervals
      } else {
        clearIntervals() // Clear intervals when the app loses focus
      }
    }

    // Initial load of markers
    fetchData()
    fetchMetroData()

    setupIntervals()

    // Add event listeners to handle app focus and blur events
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearIntervals()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [center])

  const initialLoad = useRef(true)
  useEffect(() => {
    const getStopInfo = () => {
      getSoonBusStops().then((stops) => {
        setSoonStops(stops)
      })
      if (isClockwise) {
        setSoon(soonStops[1][stop])
      } else {
        setSoon(soonStops[0][stop])
      }
    }
    if (initialLoad.current) {
      initialLoad.current = false
      getSoonBusStops().then((stops) => {
        setSoonStops(stops)
      })
    } else {
      getStopInfo()
    }
  }, [stop, isClockwise, soonStops])

  const polylineRefs = useRef({})
  const onMapLoad = ({map, maps}) => {
    const routes = [
      {
        name: 'LOOP',
        path: loopPath,
        strokeColor: '#2894f4',
      },
      {
        name: 'UPPER CAMPUS',
        path: upperCampusPath,
        strokeColor: '#50ac54',
      },
    ]
    routes.forEach((route) => {
      polylineRefs.current[route.name] = new maps.Polyline({
        path: route.path,
        geodesic: true,
        strokeColor: route.strokeColor,
        strokeOpacity: settings.selectedRoute.includes(route.name) ? 1 : 0,
        strokeWeight: 4,
      })
      polylineRefs.current[route.name].setMap(map)
    })
  }

  useEffect(() => {
    const routeNames = Object.keys(polylineRefs.current)

    routeNames.forEach((routeName) => {
      // For each route, if it is selected, set its opacity to 1, else set it to 0
      if (polylineRefs.current[routeName]) {
        if (settings.selectedRoute.includes(routeName)) {
          polylineRefs.current[routeName].setOptions({strokeOpacity: 1})
        } else {
          polylineRefs.current[routeName].setOptions({strokeOpacity: 0})
        }
      }
    })
  }, [settings.selectedRoute])

  return (
    <>
      <Box id="map" width="100%" height="100vh" data-testid="map">
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          defaultCenter={center}
          defaultZoom={zoom}
          key={settings.darkMode ? 'dark' : 'light'}
          onGoogleApiLoaded={onMapLoad}
          options={{
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: getStyle(settings.darkMode),
          }}
        >
          {Object.keys(combinedBuses)
            .filter(
              // Filter out buses that haven't updated in the last 30 minutes
              (key) =>
                !settings.filter ||
                isBusUpdatedWithinPast30Minutes(combinedBuses[key].lastPing),
            )
            .filter(
              // Filter out buses that don't match the selected routes
              (key) =>
                settings.selectedRoute.includes(combinedBuses[key].route),
            )
            .map((key) => {
              const bus = combinedBuses[key]
              return (
                <MapMarker
                  key={key}
                  lat={parseFloat(bus.lastLatitude)}
                  lng={parseFloat(bus.lastLongitude)}
                  direction={bus.direction}
                  lastPing={bus.lastPing}
                  fleetId={bus.fleetId}
                  route={bus.route}
                  heading={bus.heading}
                  displayTime={settings.displayTime}
                  darkMode={settings.darkMode}
                />
              )
            })}
          {cwStops.map((key) => {
            const stop = Object.keys(key)[0]
            return (
              <Box
                lat={key[stop].lat}
                lng={key[stop].lon}
                onClick={() => {
                  handleDrawerOpen()
                  setMetroId(key[stop].metro)
                  displayStop(stop)
                  setName(key[stop].name)
                  setDirection(true)
                }}
              >
                <BusStopMarker
                  sx={{position: 'aboslute', transform: 'translate(-50%,-50%)'}}
                />
              </Box>
            )
          })}
          {ccwStops.map((key) => {
            const stop = Object.keys(key)[0]
            return (
              <Box
                lat={key[stop].lat}
                lng={key[stop].lon}
                onClick={() => {
                  handleDrawerOpen()
                  setName(key[stop].name)
                  setMetroId(key[stop].metro)
                  displayStop(stop)
                  setDirection(false)
                }}
              >
                <BusStopMarker
                  sx={{position: 'aboslute', transform: 'translate(-50%,-50%)'}}
                />
              </Box>
            )
          })}
        </GoogleMap>
      </Box>
      <Modal
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: '50%',
          display: 'flex',
          left: '25%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Page
          busStop={stop}
          isClockwise={isClockwise}
          soon={soon}
          id={metroId}
          name={name}
        />
      </Modal>
      <AnimatePresence mode="wait">
        {wizardOpen && (
          <MainWizard
            closeWizard={() => setWizardOpen(false)}
            neverShowAgain={() => {
              localStorage.setItem('wizard', false)
              setWizardOpen(false)
            }}
          />
        )}
      </AnimatePresence>
      <SettingsDrawer
        filter={settings.filter}
        handleFilterToggle={handleFilterToggle}
        displayTime={settings.displayTime}
        toggleDisplayTime={toggleDisplayTime}
        darkMode={settings.darkMode}
      />
      <InstallPWAButton />
      <RouteSelector />
    </>
  )
}

const getStyle = (darkMode) => {
  if (darkMode) {
    return [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
      },
      {
        featureType: 'poi',
        stylers: [{visibility: 'off'}],
      },
      {
        featureType: 'poi.school',
        stylers: [{visibility: 'on'}], // This will show only schools
      },
      {
        featureType: 'transit',
        stylers: [{visibility: 'off'}],
      },
    ]
  }
  return [
    {
      featureType: 'poi',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'transit',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'poi.school',
      stylers: [{visibility: 'on'}], // This will show only schools
    },
  ]
}
