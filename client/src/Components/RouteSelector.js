import React, {useContext, useState} from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Checkbox,
  ListItemIcon,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import {
  ExpandLess,
  ExpandMore,
  DirectionsBus as MenuIcon,
} from '@mui/icons-material'
import routeColors from './bus.json'
import SettingsContext from '../SettingsContext'

const metroRoutes = ['10', '15', '18', '19', '20']
const loopRoutes = [
  'LOOP',
  'UPPER CAMPUS',
  'LOOP OUT OF SERVICE AT BARN THEATER',
  'OUT OF SERVICE/SORRY',
  'SPECIAL',
]

export default function RouteSelector() {
  //const [selectedRoute, setSelectedRoute] = useContext(RouteContext)
  const [open, setOpen] = useState('')
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const {settings, dispatch} = useContext(SettingsContext)
  const theme = useTheme()

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <IconButton
        edge="start"
        color="primary"
        aria-label="menu"
        onClick={handleDrawerOpen}
        sx={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          borderRadius: '50%',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <List
          sx={{
            width: '200px',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          >
            Bus Routes
          </Typography>
          <ListItem
            onClick={() => {
              if (open === 'Loop') {
                setOpen('')
              } else {
                setOpen('Loop')
              }
            }}
          >
            <ListItemText primary="Loop" />
            {open === 'Loop' ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === 'Loop'} timeout="auto" unmountOnExit>
            {loopRoutes.map((route) => (
              <ListItemButton
                key={route}
                onClick={() => {
                  if (settings.selectedRoute.includes(route)) {
                    dispatch({type: "DELETE_ROUTE", deletedRoute: route})
                  } else {
                    dispatch({type: "ADD_ROUTE", addedRoute: route})
                  }
                }}
                sx={{
                  padding: 0,
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
              >
                <Checkbox checked={settings.selectedRoute.includes(route)} />
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
          <ListItem
            onClick={() => {
              if (open === 'Metro') {
                setOpen('')
              } else {
                setOpen('Metro')
              }
            }}
          >
            <ListItemText primary="Metro" />
            {open === 'Metro' ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === 'Metro'} timeout="auto" unmountOnExit>
            {metroRoutes.map((route) => (
              <ListItemButton
                key={route}
                onClick={() => {
                  if (settings.selectedRoute.includes(route)) {
                    dispatch({type:"DELETE_ROUTE", deletedRoute: route})
                  } else {
                    dispatch({type: "ADD_ROUTE", addedRoute: route})
                  }
                }}
                sx={{
                  padding: 0,
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
              >
                <Checkbox checked={settings.selectedRoute.includes(route)} />
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
              dispatch({type: "CLEAR_ROUTE"})
            }}
          >
            <ListItemText primary="Clear Routes" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
