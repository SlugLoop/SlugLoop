import React, {useState, useEffect, useRef} from 'react'
import getAllBusses from './firebase'
import Legend from './Legend'
import GoogleMap from 'google-maps-react-markers'
import {Box} from '@mui/material'
import Polyline from 'google-map-react'
import MapMarker from './MapMarker'
import SettingsButton from './SettingsButton'
import AboutButton from './AboutButton'

const THIRTY_MINUTES = 30 * 60 * 1000

export default function MapComponent({center, zoom}) {
  const currentFreeColor = useRef(1)
  const busColors = useRef({})
  const [legendItems, setLegendItems] = useState({})
  const [displayTime, setDisplayTime] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  // Stores the buses in a state variable to rerender
  const [buses, setBuses] = useState({})

  function headingBetweenPoints({lat1, lon1}, {lat2, lon2}) {
    const toRad = (deg) => (deg * Math.PI) / 180 // convert degrees to radians

    // Y variable
    const dLong = toRad(lon2 - lon1)
    const Y = Math.sin(dLong) * Math.cos(toRad(lat2))

    // X variable
    const X =
      Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLong)

    // Calculate bearing
    const bearing = (toRad(360) + Math.atan2(Y, X)) % toRad(360)
    // Convert to degrees
    return (bearing * 180) / Math.PI + 180
  }

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
    getAllBusses().then((busses) => {
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
      getAllBusses().then((busses) => {
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
    return () => clearInterval(interval)
  }, [center])

  const isBusUpdatedWithinPast30Minutes = (lastPing) => {
    const currentTime = new Date()
    const lastPingTime = new Date(lastPing)
    const timeDifference = currentTime - lastPingTime
    return timeDifference < THIRTY_MINUTES
  }
  const loopPath = [
    //Main entrance
    { lat: 36.97769579674372,lng: -122.05355908425624},
    //Lower campus
    { lat: 36.98138483173853, lng: -122.0519301820712},
    //Village/Farm
    { lat: 36.985922500400044, lng: -122.0535323024805},
    //East Remote
    { lat: 36.99130427981805, lng: -122.05466955901196},
    //East Field/OPERS
    { lat: 36.994269237639365, lng: -122.05551177263281},
    //Cowell Lower
    { lat: 36.996664256455965, lng: -122.05542057751792},
    //Cowell Upper/Bookstore
    { lat: 36.99750399473223, lng: -122.05503970384831},
    //Crown/Merrill
    { lat: 36.999024925679905, lng: -122.05517381433349},
    //9/10
    { lat: 36.99994603808732, lng: -122.0583173632834},
    //Science Hill
    { lat: 36.99998691248736, lng: -122.06232597818013},
    //Kresge
    { lat: 36.99929715066683, lng: -122.06455221169047},
    //Kerr Hall
    { lat: 36.99670941703469, lng: -122.06357052316324},
    //Rachel Carson/Porter
    { lat: 36.99299314810061, lng: -122.06520042933953},
    //Family Student Housing
    { lat: 36.9917782062679, lng: -122.06680347004442},
    //Oakes Upper
    { lat: 36.99060848019419, lng: -122.06609268464845 },
    //Lower Oakes/West Remote
    { lat: 36.98995076916094, lng: -122.06721653024732},
    //Arboretum
    { lat: 36.98279441922901, lng: -122.06272274946373},
    //High & Western
    { lat: 36.97883440457822, lng: -122.05772900415315},
    //Main Entrance
    { lat: 36.977304498895286, lng: -122.05430650542885}

  ]; 

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
          <Polyline 
            path = {loopPath}
            geodesic = {true}
            strokeColor = "#FF0000"
            strokeOpacity = {1}
            strokeWeight = {4}
          />
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
