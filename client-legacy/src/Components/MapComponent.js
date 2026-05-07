import React, {useState, useEffect, useContext} from 'react'
import {
  getAllBuses,
  getUpdatedBuses,
  getAllMetroBuses,
  getUpdatedMetroBuses,
  getBusEtas,
} from './firebase'
import GoogleMap from 'google-maps-react-markers'
import {Alert, Box, Chip, Stack, Typography, useTheme} from '@mui/material'
import MapMarker from './MapMarker'
import {isBusUpdatedWithinPast30Minutes} from './helper'
import RouteSelector from './RouteSelector'
import {RouteContext} from '../Route'
import SettingsDrawer from './SettingsDrawer'
import AppContext from '../appContext'
import StopMarker from './StopMarkers'
import {mapPanelSx} from './Theme/museumStyles'
const busStops = require('../data/client-bus-stops.json')

export default function MapComponent({center, zoom}) {
  const [displayTime, setDisplayTime] = useState(true)
  const {darkMode} = useContext(AppContext)
  const theme = useTheme()
  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  const [buses, setBuses] = useState([])
  const [metroBuses, setMetroBuses] = useState([])
  const combinedBuses = buses.concat(metroBuses)
  const [selectedRoute] = useContext(RouteContext)
  const [stopsEta, setStopsEta] = useState({cw: {}, ccw: {}})
  const visibleBuses = combinedBuses.filter((bus) => {
    const isRecent = !filter || isBusUpdatedWithinPast30Minutes(bus.lastPing)
    return isRecent && selectedRoute.includes(bus.route)
  })

  function toggleDisplayTime() {
    setDisplayTime(!displayTime)
  }

  function handleFilterToggle() {
    setFilter(!filter)
  }

  useEffect(() => {
    let interval, interval2

    const fetchAllData = () => {
      getAllBuses().then((buses) => {
        setBuses(buses)
      })
    }
    const fetchAllMetroData = () => {
      getAllMetroBuses().then((buses) => {
        setMetroBuses(buses)
      })
    }

    const fetchUpdatedData = () => {
      getUpdatedBuses().then((newBuses) => {
        setBuses((oldBuses) => {
          return oldBuses.map((oldBus) => {
            const newBus = newBuses.find((bus) => bus.id === oldBus.id)
            return newBus || oldBus
          })
        })
      })
    }

    const fetchUpdatedMetroData = () => {
      getUpdatedMetroBuses().then((newBuses) => {
        setMetroBuses((oldBuses) => {
          return oldBuses.map((oldBus) => {
            const newBus = newBuses.find((bus) => bus.id === oldBus.id)
            return newBus || oldBus
          })
        })
      })
    }

    const updateStopEtas = async () => {
      setStopsEta(await getBusEtas())
    }

    const setupIntervals = () => {
      // Update positions of markers every 5 seconds
      interval = setInterval(fetchUpdatedData, 5000)
      interval2 = setInterval(fetchUpdatedMetroData, 12000)
    }

    const clearIntervals = () => {
      clearInterval(interval)
      clearInterval(interval2)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUpdatedData()
        fetchUpdatedMetroData()
        updateStopEtas()
        clearIntervals() // Clear existing intervals
        setupIntervals() // Set up new intervals
      } else {
        clearIntervals() // Clear intervals when the app loses focus
      }
    }

    // Initial load of markers, including ones update more than 30 minutes ago
    fetchAllData()
    fetchAllMetroData()
    updateStopEtas()
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
          {visibleBuses
            .map((bus, index) => {
              return (
                <MapMarker
                  key={`${bus.id || bus.fleetId || bus.route}-${index}`}
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
            {/* Bus Stops Markers */}
            {busStops.bstop["CW"].map((currStop) => {
              const stopName = Object.keys(currStop)[0]
              return (
                <StopMarker
                  key={"cw" + stopName}
                  lat={parseFloat(currStop[stopName].lat)}
                  lng={parseFloat(currStop[stopName].lon)}
                  name={(stopName[0].toUpperCase() + stopName.slice(1))}
                  eta={stopName in stopsEta.cw ? stopsEta.cw[stopName] : null}
                  displayTime={displayTime}
                  darkMode={darkMode}
                />
              )
            })}
            {busStops.bstop["CCW"].map((currStop) => {
              const stopName = Object.keys(currStop)[0]
              return (
                <StopMarker
                  key={"ccw" + stopName}
                  lat={parseFloat(currStop[stopName].lat)}
                  lng={parseFloat(currStop[stopName].lon)}
                  name={(stopName[0].toUpperCase() + stopName.slice(1))}
                  eta={stopName in stopsEta.ccw ? stopsEta.ccw[stopName] : null}
                  displayTime={displayTime}
                  darkMode={darkMode}
                />
              )
            })}
        </GoogleMap>
      </Box>
      <Box
        sx={{
          ...mapPanelSx(theme),
          position: 'absolute',
          left: {xs: 16, md: 28},
          top: {xs: 20, md: 28},
          maxWidth: {xs: 'calc(100vw - 110px)', md: 430},
          zIndex: 2,
          p: 2,
          borderRadius: 3,
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
            <Chip label="Map artifact" size="small" color="secondary" />
            <Typography variant="caption" sx={{color: theme.museum.mapPanelSubtle}}>
              Preserved demo
            </Typography>
          </Stack>
          <Typography variant="body2">
            This keeps the original Firestore and Google Maps flow. Vehicle data
            may be stale if the hardware or sync jobs are no longer running.
          </Typography>
        </Stack>
      </Box>
      {visibleBuses.length === 0 && (
        <Alert
          severity="warning"
          sx={{
            position: 'absolute',
            left: {xs: 16, md: 28},
            bottom: {xs: 20, md: 28},
            maxWidth: 440,
            zIndex: 2,
            backgroundColor: theme.museum.mapAlertBackground,
          }}
        >
          No recent vehicles match the selected routes. Try showing past buses
          from the menu, or treat this as a static demo moment.
        </Alert>
      )}
      <SettingsDrawer
        filter={filter}
        handleFilterToggle={handleFilterToggle}
        displayTime={displayTime}
        toggleDisplayTime={toggleDisplayTime}
        darkMode={darkMode}
      />
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
    {elementType: 'geometry', stylers: [{color: '#f1ead8'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#fff8e8'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#526272'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6e4b00'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#ffffff'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#d5c7aa'}],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#526272'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f4d995'}],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#c9d9d1'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#5b716e'}],
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
