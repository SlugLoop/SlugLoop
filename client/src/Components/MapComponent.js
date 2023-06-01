import React, {useState, useEffect, useContext} from 'react'
import {getAllBuses, getAllMetroBuses} from './firebase'
import GoogleMap from 'google-maps-react-markers'
import {Box} from '@mui/material'
import MapMarker from './MapMarker'
import {isBusUpdatedWithinPast30Minutes} from './helper'
import RouteSelector from './RouteSelector'
import {RouteContext} from '../Route'
import MainWizard from './Wizard/MainWizard'
import InstallPWAButton from './PwaButton'
import SettingsDrawer from './SettingsDrawer'
import AppContext from '../appContext'
import {AnimatePresence} from 'framer-motion'

export default function MapComponent({center, zoom}) {
  const [displayTime, setDisplayTime] = useState(true)
  const {darkMode} = useContext(AppContext)
  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  // Wizard State
  const [wizardOpen, setWizardOpen] = useState(
    localStorage.getItem('wizard') !== 'false',
  )

  // Stores the buses in a state variable to rerender
  const [buses, setBuses] = useState([])
  const [metroBuses, setMetroBuses] = useState([])
  const combinedBuses = buses.concat(metroBuses)
  const [selectedRoute] = useContext(RouteContext)
  function toggleDisplayTime() {
    setDisplayTime(!displayTime)
  }

  function handleFilterToggle() {
    setFilter(!filter)
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

  return (
    <>
      <Box id="map" width="100%" height="100vh" data-testid="map">
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          defaultCenter={center}
          defaultZoom={zoom}
          onGoogleApiLoaded={() => {}}
          key={darkMode ? 'dark' : 'light'}
          options={{
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: getStyle(darkMode),
          }}
        >
          {Object.keys(combinedBuses)
            .filter(
              // Filter out buses that haven't updated in the last 30 minutes
              (key) =>
                !filter ||
                isBusUpdatedWithinPast30Minutes(combinedBuses[key].lastPing),
            )
            .filter(
              // Filter out buses that don't match the selected routes
              (key) => selectedRoute.includes(combinedBuses[key].route),
            )
            .map((key) => {
              const bus = combinedBuses[key]
              return (
                <MapMarker
                  key={key}
                  lat={parseFloat(bus.lastLatitude)}
                  lng={parseFloat(bus.lastLongitude)}
                  lastPing={bus.lastPing}
                  fleetId={bus.fleetId}
                  direction={bus.direction}
                  route={bus.route}
                  heading={bus.heading}
                  displayTime={displayTime}
                  darkMode={darkMode}
                />
              )
            })}
        </GoogleMap>
      </Box>
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
        filter={filter}
        handleFilterToggle={handleFilterToggle}
        displayTime={displayTime}
        toggleDisplayTime={toggleDisplayTime}
        darkMode={darkMode}
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
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
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
    ]
  }
  return [
    {
      featureType: 'poi',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'poi.school',
      stylers: [{visibility: 'on'}], // This will show only schools
    },
  ]
}
