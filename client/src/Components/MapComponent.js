'use client'

import React, {useState, useEffect, useContext} from 'react'
import {
  getAllBuses,
  getUpdatedBuses,
  getAllMetroBuses,
  getUpdatedMetroBuses,
  getBusEtas,
} from '../lib/busData'
import GoogleMap from 'google-maps-react-markers'
import MapMarker from './MapMarker'
import RouteSelector from './RouteSelector'
import {RouteContext} from '../Route'
import SettingsDrawer from './SettingsDrawer'
import AppContext from '../appContext'
import StopMarker from './StopMarkers'
import Chip from './ui/Chip'
import {formatStopName, getVisibleBuses, mergeUpdatedBuses} from '../lib/mapHelpers'
const busStops = require('../data/client-bus-stops.json')

export default function MapComponent({center, zoom}) {
  const [displayTime, setDisplayTime] = useState(true)
  const {darkMode} = useContext(AppContext)
  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  const [buses, setBuses] = useState([])
  const [metroBuses, setMetroBuses] = useState([])
  const [selectedRoute] = useContext(RouteContext)
  const [stopsEta, setStopsEta] = useState({cw: {}, ccw: {}})
  const visibleBuses = getVisibleBuses({buses, metroBuses, filter, selectedRoute})

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
        setBuses((oldBuses) => mergeUpdatedBuses(oldBuses, newBuses))
      })
    }

    const fetchUpdatedMetroData = () => {
      getUpdatedMetroBuses().then((newBuses) => {
        setMetroBuses((oldBuses) => mergeUpdatedBuses(oldBuses, newBuses))
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

  const markers = (
    <>
      {visibleBuses.map((bus, index) => {
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
      {busStops.bstop['CW'].map((currStop) => {
        const stopName = Object.keys(currStop)[0]
        return (
          <StopMarker
            key={`cw${stopName}`}
            lat={parseFloat(currStop[stopName].lat)}
            lng={parseFloat(currStop[stopName].lon)}
            name={formatStopName(stopName)}
            eta={stopName in stopsEta.cw ? stopsEta.cw[stopName] : null}
            displayTime={displayTime}
            darkMode={darkMode}
          />
        )
      })}
      {busStops.bstop['CCW'].map((currStop) => {
        const stopName = Object.keys(currStop)[0]
        return (
          <StopMarker
            key={`ccw${stopName}`}
            lat={parseFloat(currStop[stopName].lat)}
            lng={parseFloat(currStop[stopName].lon)}
            name={formatStopName(stopName)}
            eta={stopName in stopsEta.ccw ? stopsEta.ccw[stopName] : null}
            displayTime={displayTime}
            darkMode={darkMode}
          />
        )
      })}
    </>
  )

  return (
    <>
      <div id="map" data-testid="map" className="h-screen w-full">
        {process.env.NEXT_PUBLIC_SLUGLOOP_TEST_MODE === '1' ? (
          <div data-testid="google-map" className="h-full w-full">
            {markers}
          </div>
        ) : (
          <GoogleMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}
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
            {markers}
          </GoogleMap>
        )}
      </div>
      <div className="museum-map-panel absolute left-4 top-5 z-[2] max-w-[calc(100vw-110px)] rounded-3xl p-4 md:left-7 md:top-7 md:max-w-[430px]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Chip label="Map artifact" />
            <span className="type-caption text-[var(--museum-map-panel-subtle)]">
              Preserved demo
            </span>
          </div>
          <p className="text-sm">
            This keeps the original Firestore and Google Maps flow. Vehicle data
            may be stale if the hardware or sync jobs are no longer running.
          </p>
        </div>
      </div>
      {visibleBuses.length === 0 && (
        <div
          role="alert"
          className="museum-alert absolute bottom-5 left-4 z-[2] max-w-[440px] rounded-2xl px-4 py-3 text-sm text-[#7a4a00] shadow-xl md:bottom-7 md:left-7"
        >
          No recent vehicles match the selected routes. Try showing past buses
          from the menu, or treat this as a static demo moment.
        </div>
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
