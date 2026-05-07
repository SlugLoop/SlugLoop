'use client'

import React, {useState, useEffect, useContext} from 'react'
import {
  getAllBuses,
  getUpdatedBuses,
  getAllMetroBuses,
  getUpdatedMetroBuses,
  getBusEtas,
} from '../lib/busData'
import {signInAnonymously} from 'firebase/auth'
import {auth} from '../firebase'
import GoogleMap from 'google-maps-react-markers'
import MapMarker from './MapMarker'
import RouteSelector from './RouteSelector'
import {RouteContext} from '../Route'
import SettingsDrawer from './SettingsDrawer'
import AppContext from '../appContext'
import StopMarker from './StopMarkers'
import Stamp from './ui/Stamp'
import {formatStopName, getVisibleBuses, mergeUpdatedBuses} from '../lib/mapHelpers'

const isTestMode = process.env.NEXT_PUBLIC_SLUGLOOP_TEST_MODE === '1'

function ensureFirebaseAuth() {
  if (isTestMode) return Promise.resolve(null)
  if (auth.currentUser) return Promise.resolve(auth.currentUser)
  return signInAnonymously(auth).then((cred) => cred.user)
}

function silenceFirestore(label) {
  return (error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[SlugLoop] ${label} skipped:`, error?.message || error)
    }
  }
}
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
    let cancelled = false
    let interval, interval2

    const fetchAllData = () => {
      getAllBuses()
        .then((buses) => {
          if (!cancelled) setBuses(buses)
        })
        .catch(silenceFirestore('getAllBuses'))
    }
    const fetchAllMetroData = () => {
      getAllMetroBuses()
        .then((buses) => {
          if (!cancelled) setMetroBuses(buses)
        })
        .catch(silenceFirestore('getAllMetroBuses'))
    }

    const fetchUpdatedData = () => {
      getUpdatedBuses()
        .then((newBuses) => {
          if (!cancelled) {
            setBuses((oldBuses) => mergeUpdatedBuses(oldBuses, newBuses))
          }
        })
        .catch(silenceFirestore('getUpdatedBuses'))
    }

    const fetchUpdatedMetroData = () => {
      getUpdatedMetroBuses()
        .then((newBuses) => {
          if (!cancelled) {
            setMetroBuses((oldBuses) => mergeUpdatedBuses(oldBuses, newBuses))
          }
        })
        .catch(silenceFirestore('getUpdatedMetroBuses'))
    }

    const updateStopEtas = () => {
      getBusEtas()
        .then((etas) => {
          if (!cancelled) setStopsEta(etas)
        })
        .catch(silenceFirestore('getBusEtas'))
    }

    const setupIntervals = () => {
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
        clearIntervals()
        setupIntervals()
      } else {
        clearIntervals()
      }
    }

    ensureFirebaseAuth()
      .catch(silenceFirestore('anonymous sign-in'))
      .then(() => {
        if (cancelled) return
        fetchAllData()
        fetchAllMetroData()
        updateStopEtas()
        setupIntervals()
      })

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelled = true
      clearIntervals()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [center])

  const markers = [
    ...visibleBuses.map((bus, index) => (
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
    )),
    ...busStops.bstop['CW'].map((currStop) => {
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
    }),
    ...busStops.bstop['CCW'].map((currStop) => {
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
    }),
  ]

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
      <div className="museum-map-panel absolute left-4 top-5 z-[2] max-w-[calc(100vw-110px)] rounded-md p-4 md:left-7 md:top-7 md:max-w-[420px]">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
              // map artifact
            </p>
            <p className="font-display text-lg font-semibold leading-tight">
              Preserved demo of the original wiring.
            </p>
            <p className="text-sm leading-snug text-[var(--ink-soft)]">
              Original Firestore + Google Maps flow. Vehicle data is likely
              stale; the hardware stopped pinging some time ago.
            </p>
          </div>
          <Stamp tone="red" size="sm" rotate={-8}>
            archive
          </Stamp>
        </div>
      </div>
      {visibleBuses.length === 0 && (
        <div
          role="alert"
          className="museum-alert absolute bottom-5 left-4 z-[2] max-w-[440px] rounded-md px-4 py-3 text-sm shadow-xl md:bottom-7 md:left-7"
        >
          <div className="flex items-start gap-3">
            <Stamp tone="red" size="sm" rotate={-6}>
              demo only
            </Stamp>
            <p className="text-[var(--ink)] type-hand text-[1.2rem] leading-tight">
              no buses match right now &mdash; the receivers stopped reporting.
              try showing past buses from the menu, or treat this as a still
              frame.
            </p>
          </div>
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
