import React, {useState} from 'react'
import {
  List,
  ListItemButton,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'

import {Menu as MenuIcon} from '@mui/icons-material'

export default function SettingsDrawer(props) {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

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
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerOpen}
        sx={{
          position: 'absolute',
          right: '30px',
          top: '90px',
          borderRadius: '50%',
          backgroundColor: 'white',
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
            Settings
          </Typography>
          <ListItemButton
            onClick={() => {
              props.toggleDisplayTime()
            }}
          >
            {props.displayTime ? 'Hide Time' : 'Show Time'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              props.handleDarkToggle()
            }}
          >
            {props.darkMode ? 'Light Mode' : 'Dark Mode'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              props.handleFilterToggle()
            }}
          >
            {props.filter ? 'Show All Buses' : 'Show Only Recent Buses'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('/contact')
            }}
          >
            Contact Us
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('/about')
            }}
            autoFocus
            sx={{
              paddingBottom: '6%',
            }}
          >
            About Us
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
