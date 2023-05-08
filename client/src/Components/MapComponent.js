import React, {useState, useEffect, useRef, useContext} from 'react'
import {getAllBuses, getAllMetroBuses} from './firebase'
import Legend from './Legend'
import GoogleMap from 'google-maps-react-markers'
import {Box} from '@mui/material'
import MapMarker from './MapMarker'
import SettingsButton from './SettingsButton'
import AboutButton from './AboutButton'
import {headingBetweenPoints, isBusUpdatedWithinPast30Minutes} from './helper'
import RouteSelector from './RouteSelector'
import {RouteContext} from '../Route'

export default function MapComponent({center, zoom}) {
  const currentFreeColor = useRef(1)
  const busColors = useRef({})
  const [legendItems, setLegendItems] = useState({})
  const [displayTime, setDisplayTime] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  // Stores the buses in a state variable to rerender
  const [buses, setBuses] = useState({})
  const [metroBuses, setMetroBuses] = useState({})
  const combinedRoutes = {...buses, ...metroBuses}
  const [selectedRoute, setSelectedRoute] = useContext(RouteContext)

  function toggleDisplayTime() {
    setDisplayTime(!displayTime)
  }

  function handleDarkToggle() {
    setDarkMode(!darkMode)
  }

  function handleFilterToggle() {
    setFilter(!filter)
  }

  useEffect(() => {
    // Initial load of markers
    getAllBuses().then((busses) => {
      // Sort buses based on route
      busses.sort((a, b) => {
        if (a.route < b.route) {
          return -1
        }
        if (a.route > b.route) {
          return 1
        }
        return 0
      })
      busses.forEach((bus) => {
        // Used to define new colors/icons for routes
        // Set color for route if it doesnt exist
        if (busColors.current[bus.route] === undefined) {
          // Set marker to next free color
          busColors.current = {
            ...busColors.current,
            [bus.route]: currentFreeColor.current,
          }
          currentFreeColor.current = currentFreeColor.current + 1
          // Increment the value of currentFreeColor.current by 1
        }
      })

      // Set legend items
      const temp = Object.keys(busColors.current).map((route) => ({
        name: route,
        icon: `${busColors.current[route]}.ico`,
      }))

      setLegendItems(temp)
      setBuses(busses)
    })
  }, [center, zoom])

  // Update positions of markers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getAllBuses().then((busses) => {
        busses.forEach((bus) => {
          // Set color for route if it doesnt exist
          if (!buses[bus.id]) {
            if (busColors.current[bus.route] === undefined) {
              busColors.current = {
                ...busColors.current,
                [bus.route]: currentFreeColor.current,
              }
              // Increment the value of currentFreeColor.current by 1
              currentFreeColor.current = currentFreeColor.current + 1

              // Add new color to legend
              setLegendItems(
                Object.keys(busColors.current).map((route) => ({
                  name: route,
                  icon: `${busColors.current[route]}.ico`,
                })),
              )
            }
          }
        })

        setBuses(busses)
      })
    }, 5000)
    const interval2 = setInterval(() => {
      getAllMetroBuses().then((buses) => {
        setMetroBuses(buses)
      })
    }, 12000)
    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
  }, [center])

  return (
    <>
      <Box
        id="map"
        data-testid="map"
        sx={{
          height: window.innerHeight,
          width: '100vw',
        }}
      >
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
            styles: darkMode && getStyle(darkMode),
          }}
        >
          {Object.keys(buses)
            .filter(
              (key) =>
                !filter || isBusUpdatedWithinPast30Minutes(buses[key].lastPing),
            )
            .map((key) => {
              const bus = buses[key]
              const currLocation = {
                lat1: bus.lastLatitude,
                lon1: bus.lastLongitude,
              }
              const previousLocation = {
                lat2: bus.previousLatitude
                  ? bus.previousLatitude
                  : bus.lastLatitude,
                lon2: bus.previousLongitude
                  ? bus.previousLongitude
                  : bus.lastLongitude,
              }

              const heading = headingBetweenPoints(
                currLocation,
                previousLocation,
              )
              return (
                <MapMarker
                  key={key}
                  color={busColors.current[bus.route]}
                  lat={bus.lastLatitude}
                  lng={bus.lastLongitude}
                  bus={bus}
                  heading={heading}
                  displayTime={displayTime}
                  darkMode={darkMode}
                />
              )
            })}
        </GoogleMap>
      </Box>
      <Legend legendItems={legendItems} />
      <AboutButton darkMode={darkMode} />
      <SettingsButton
        filter={filter}
        handleFilterToggle={handleFilterToggle}
        displayTime={displayTime}
        toggleDisplayTime={toggleDisplayTime}
        darkMode={darkMode}
        handleDarkToggle={handleDarkToggle}
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
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
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
    ]
  }
  return []
}
