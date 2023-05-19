import React, {useContext, useState} from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Checkbox,
  ListItemIcon,
} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import {RouteContext} from '../Route'
import routeColors from './bus.json'

const metroRoutes = ['10', '15', '18', '19', '20']
const loopRoutes = [
  'LOOP',
  'UPPER CAMPUS',
  'LOOP OUT OF SERVICE AT BARN THEATER',
  'EAST NIGHT CORE',
  'OUT OF SERVICE/SORRY',
]

export default function RouteSelector(props) {
  const [selectedRoute, setSelectedRoute] = useContext(RouteContext)
  const [open, setOpen] = useState('')

  return (
    <>
      <List
        sx={{
          width: '200px',
          maxWidth: '50%',
          position: 'absolute',
          top: '20px',
          right: '10px',
          backgroundColor: 'white',
          padding: 0,

          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ListItemButton
          onClick={() => {
            setOpen(open === 'Loop' ? '' : 'Loop')
          }}
        >
          <ListItemText primary="Loop" />
          {open === 'Loop' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === 'Loop'} timeout="auto" unmountOnExit>
          {loopRoutes.map((route) => (
            <ListItemButton
              key={route}
              onClick={() => {
                if (selectedRoute.includes(route)) {
                  setSelectedRoute(selectedRoute.filter((r) => r !== route))
                } else {
                  setSelectedRoute([...selectedRoute, route])
                }
              }}
              sx={{
                padding: 0,
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
            >
              <Checkbox checked={selectedRoute.includes(route)} />
              <ListItemText primary={route} />
              <ListItemIcon>
                <img
                  src={routeColors[route]}
                  alt="bus"
                  style={{width: '20px', height: '20px'}}
                />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </Collapse>
        <ListItemButton
          onClick={() => {
            setOpen(open === 'Metro' ? '' : 'Metro')
          }}
        >
          <ListItemText primary="Metro" />
          {open === 'Metro' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open === 'Metro'} timeout="auto" unmountOnExit>
          {metroRoutes.map((route) => (
            <ListItemButton
              key={route}
              onClick={() => {
                if (selectedRoute.includes(route)) {
                  setSelectedRoute(selectedRoute.filter((r) => r !== route))
                } else {
                  setSelectedRoute([...selectedRoute, route])
                }
              }}
              sx={{
                padding: 0,
                paddingTop: '5px',
                paddingBottom: '5px',
              }}
            >
              <Checkbox checked={selectedRoute.includes(route)} />
              <ListItemText primary={route} />
              <ListItemIcon>
                <img
                  src={routeColors[route]}
                  alt="bus"
                  style={{width: '20px', height: '20px'}}
                />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </Collapse>
        <ListItemButton
          onClick={() => {
            setSelectedRoute([])
          }}
        >
          <ListItemText primary="Clear Routes" />
        </ListItemButton>
      </List>
    </>
  )
}
