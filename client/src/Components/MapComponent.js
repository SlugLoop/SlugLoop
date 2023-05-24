import React, {useState, useEffect, useRef, useContext} from 'react'
import getAllBusses from './firebase'
import Legend from './Legend'
import GoogleMap from 'google-maps-react-markers'
import {Box} from '@mui/material'
import Polyline from 'google-map-react'
import MapMarker from './MapMarker'
import SettingsButton from './SettingsButton'
import AboutButton from './AboutButton'
import Button from '@mui/material/Button'
import SettingsContext from './SettingsContext'

const THIRTY_MINUTES = 30 * 60 * 1000

export default function MapComponent({center, zoom}) {
  const currentFreeColor = useRef(1)
  const {settings, dispatch} = useContext(SettingsContext)
  const busColors = useRef({})
  const [legendItems, setLegendItems] = useState({})
  //const [displayTime, setDisplayTime] = useState(true)
  //const [darkMode, setDarkMode] = useState(false)
  //const [filter, setFilter] = useState(true) // If true, only displays buses from last 30 minutes

  // Stores the buses in a state variable to rerender
  const [buses, setBuses] = useState({})
  const loopPath = [
    //Main entrance
    {lat: 36.97769579674372, lng: -122.05355908425624},
    {lat: 36.978711, lng: -122.054233},
    {lat: 36.980078, lng: -122.053992},
    //Lower campus
    {lat: 36.98138483173853, lng: -122.0519301820712},
    {lat: 36.982079789538034, lng: -122.05101367982367},
    //Village/Farm
    {lat: 36.985922500400044, lng: -122.0535323024805},
    {lat: 36.987010851607735, lng: -122.0543818636698},
    {lat: 36.98746184088179, lng: -122.0544247790121},
    {lat: 36.98855341671156, lng: -122.05416728693808},
    //East Remote
    {lat: 36.99130427981805, lng: -122.05466955901196},
    {lat: 36.99182806494234, lng: -122.05507923050932},
    {lat: 36.993276271374256, lng:-122.05519724769209},
    //East Field/OPERS
    {lat: 36.994269237639365, lng: -122.05551177263281},
    {lat: 36.9960612061781, lng:-122.05521870535034},
    //Cowell Lower
    {lat: 36.996664256455965, lng: -122.05542057751792},
    //Cowell Upper/Bookstore
    {lat: 36.99750399473223, lng: -122.05503970384831},
    {lat: 36.998032021493266, lng: -122.05521870536136},
    {lat: 36.998786059048065, lng: -122.05498267097857},
    //Crown/Merrill
    {lat: 36.999024925679905, lng: -122.05517381433349},
    {lat: 36.99913308522764, lng: -122.05553386492107},
    {lat: 36.99991924351622, lng: -122.05615479628307},
    {lat: 37.00011845945382, lng: -122.05679182092369},
    //9/10
    {lat: 36.99994603808732, lng: -122.0583173632834},
    {lat :36.999822848529135, lng: -122.05856744327447},
    {lat: 36.99982070641793, lng: -122.05892685930218},
    {lat: 37.00018058044987, lng:-122.06061933317646},
    {lat: 37.00016344362947, lng: -122.06145081796954},
    //Science Hill
    //{lat: 36.99998691248736, lng: -122.06232597818013},
    {lat: 36.999895680311546, lng: -122.06224475185192},
    {lat: 36.99964933722877, lng: -122.06295553725451},
    {lat: 36.99944583582108, lng: -122.06383261959134},
    //Kresge
    //{lat: 36.99929715066683, lng: -122.06455221169047},
    {lat: 36.99938585635524, lng: -122.06442538775721},
    {lat: 36.99866395691348, lng: -122.06452731171402},
    {lat: 36.99789063864336, lng: -122.06378433984429},
    //Kerr Hall
    {lat: 36.99670941703469, lng: -122.06357052316324},
    {lat: 36.996194042614555, lng: -122.06373603426688},
    {lat: 36.99547425512143, lng: -122.06334979618596},
    {lat: 36.994240317821436, lng: -122.06346781338404},
    {lat: 36.99309205263818, lng: -122.06410617912573},
    {lat: 36.992903529832795, lng: -122.0646855362495},
    //Rachel Carson/Porter
    //{lat: 36.99299314810061, lng: -122.06520042933953},
    {lat: 36.9928992452182, lng: -122.06512541850833},
    {lat: 36.99286068367603, lng: -122.06586034374565},
    {lat: 36.99255219061683, lng: -122.06642360766821},
    //Family Student Housing
    {lat: 36.9917782062679, lng: -122.06680347004442},
    {lat: 36.99100970661896, lng: -122.06625194630226},
    //Oakes Upper
    {lat: 36.99060848019419, lng: -122.06609268464845},
    {lat: 36.990204174745735, lng: -122.06647725186478},
    //Lower Oakes/West Remote
    {lat: 36.98995076916094, lng: -122.06721653024732},
    {lat: 36.989445782368065, lng: -122.06774327562857},
    {lat: 36.98868736734787, lng: -122.06810269162055},
    {lat: 36.988113194977984, lng: -122.06824753094087},
    {lat: 36.98783039208665, lng: -122.06868741319968},
    {lat: 36.985593641249125, lng: -122.06731412223523},
    {lat: 36.98446238590784, lng: -122.065962288952},
    {lat: 36.983686780631736, lng:-122.0648303966998},
    //Arboretum
    {lat: 36.98279441922901, lng: -122.06272274946373},
    {lat: 36.97975721159258, lng: -122.05903682544384},
    //High & Western
    {lat: 36.97883440457822, lng: -122.05772900415315},
    {lat: 36.97752879435001, lng: -122.05602738691739},
    //Main Entrance
    {lat: 36.977304498895286, lng: -122.05430650542885},
    {lat: 36.97722881012106, lng: -122.05356511908309},
    {lat: 36.97769579674372, lng: -122.05355908425624},
  ]

  const upperCampusPath = [
    //East Remote Interior
    {lat:36.990793907643535, lng: -122.05219793743026},
    //East Remote
    {lat: 36.99130427981805, lng: -122.05466955901196},
    {lat: 36.99182806494234, lng: -122.05507923050932},
    {lat: 36.993276271374256, lng:-122.05519724769209},
    //East Field/OPERS
    {lat: 36.994269237639365, lng: -122.05551177263281},
    {lat: 36.9960612061781, lng:-122.05521870535034},
    //Cowell Lower
    {lat: 36.996664256455965, lng: -122.05542057751792},
    //Cowell Upper/Bookstore
    {lat: 36.99750399473223, lng: -122.05503970384831},
    {lat: 36.998032021493266, lng: -122.05521870536136},
    {lat: 36.998786059048065, lng: -122.05498267097857},
    //Crown/Merrill
    {lat: 36.999024925679905, lng: -122.05517381433349},
    {lat: 36.99913308522764, lng: -122.05553386492107},
    {lat: 36.99991924351622, lng: -122.05615479628307},
    {lat: 37.00011845945382, lng: -122.05679182092369},
    //9/10
    {lat: 36.99994603808732, lng: -122.0583173632834},
    {lat :36.999822848529135, lng: -122.05856744327447},
    {lat: 36.99982070641793, lng: -122.05892685930218},
    {lat: 37.00018058044987, lng:-122.06061933317646},
    {lat: 37.00016344362947, lng: -122.06145081796954},
    //Science Hill
    //{lat: 36.99998691248736, lng: -122.06232597818013},
    {lat: 36.999895680311546, lng: -122.06224475185192},
    {lat: 36.99964933722877, lng: -122.06295553725451},
    {lat: 36.99944583582108, lng: -122.06383261959134},
    //Kresge
    //{lat: 36.99929715066683, lng: -122.06455221169047},
    {lat: 36.99938585635524, lng: -122.06442538775721},
    {lat: 36.99866395691348, lng: -122.06452731171402},
    {lat: 36.99789063864336, lng: -122.06378433984429},
    //Kerr Hall
    {lat: 36.99670941703469, lng: -122.06357052316324},
    {lat: 36.996194042614555, lng: -122.06373603426688},
    {lat: 36.99547425512143, lng: -122.06334979618596},
    {lat: 36.994240317821436, lng: -122.06346781338404},
    {lat: 36.99309205263818, lng: -122.06410617912573},
    {lat: 36.992903529832795, lng: -122.0646855362495},
    //Rachel Carson/Porter
    //{lat: 36.99299314810061, lng: -122.06520042933953},
    {lat: 36.9928992452182, lng: -122.06512541850833},
    {lat: 36.99286068367603, lng: -122.06586034374565},
    {lat: 36.99255219061683, lng: -122.06642360766821},
    //Family Student Housing
    {lat: 36.9917782062679, lng: -122.06680347004442},
    {lat: 36.99100970661896, lng: -122.06625194630226},
    //Oakes Upper
    {lat: 36.99060848019419, lng: -122.06609268464845},
    {lat: 36.990204174745735, lng: -122.06647725186478},
    //Lower Oakes/West Remote
    {lat: 36.98995076916094, lng: -122.06721653024732},
    {lat: 36.989445782368065, lng: -122.06774327562857},
    {lat: 36.9891558463666, lng: -122.06731963702788},
    {lat: 36.98872307775049, lng: -122.0670192296316},
    {lat: 36.98855596841801, lng: -122.06479299624851},

    
  ]
  //const [path, setPath] = useState(true)

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
/*
  function toggleDisplayTime() {
    setDisplayTime(!displayTime)
  }

  function handleDarkToggle() {
    setDarkMode(!darkMode)
  }

  function handleFilterToggle() {
    setFilter(!filter)
  }
*/
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

  
  

  const polylineRef = useRef(null)

  const onMapLoad = ({map, maps}) => {
 
    //setPath(true)
    polylineRef.current = new maps.Polyline({
      path: settings.path ? loopPath : upperCampusPath,
      geodesic: true,
      strokeColor: settings.path ?'#FF0000':'#0000FF',
      strokeOpacity: 1,
      strokeWeight: 4,
    })
    
    polylineRef.current.setMap(map)
  }

  useEffect(() => {

    if(polylineRef.current){
      if(settings.path){
        polylineRef.current.setOptions({
          path:loopPath,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1,
          strokeWeight: 4,
        })
        
      }
      else{
        polylineRef.current.setOptions({
          path:upperCampusPath,
          geodesic: true,
          strokeColor: '#0000FF',
          strokeOpacity: 1,
          strokeWeight: 4,
        })
      }
    }

  },[settings.path]);


  const isBusUpdatedWithinPast30Minutes = (lastPing) => {
    const currentTime = new Date()
    const lastPingTime = new Date(lastPing)
    const timeDifference = currentTime - lastPingTime
    return timeDifference < THIRTY_MINUTES
  }

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
          onGoogleApiLoaded={onMapLoad}
          key={settings.darkMode ? 'dark' : 'light'}
          options={{
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: settings.darkMode && getStyle(settings.darkMode),
          }}
        >
          {Object.keys(buses)
            .filter(
              (key) =>
                !settings.filter || isBusUpdatedWithinPast30Minutes(buses[key].lastPing),
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
                  displayTime={settings.displayTime}
                  darkMode={settings.darkMode}
                />
              )
            })}
        </GoogleMap>
      </Box>
      <Button
        onClick={() => dispatch({type: "SET_PATH"})}
        disableRipple
        sx={{
          position: 'absolute',
          top: '20px',
          left: '200px',

          backgroundColor: 'white',
          borderRadius: '5px',
          opacity: '0.7',
        }}
        >
        {settings.path ? 'Loop' : 'Upper Campus'}
      </Button>
      <Legend legendItems={legendItems} />
      <AboutButton darkMode={settings.darkMode} />
      <SettingsButton

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
