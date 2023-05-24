import React, {useState} from 'react'
import {
  List,
  ListItemButton,
  Drawer,
  IconButton,
  Typography,
  Divider,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {Info as InfoIcon} from '@mui/icons-material'
import {Mail as MailIcon} from '@mui/icons-material'
import {FilterList as FilterListIcon} from '@mui/icons-material'
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material'
import {AccessTime as AccessTimeIcon} from '@mui/icons-material'
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
            <AccessTimeIcon
              sx={{
                mr: 2,
              }}
            />
            {props.displayTime ? 'Hide Time' : 'Show Time'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              props.handleDarkToggle()
            }}
          >
            {props.darkMode ? (
              <Brightness7Icon
                sx={{
                  mr: 2,
                }}
              />
            ) : (
              <Brightness4Icon
                sx={{
                  mr: 2,
                }}
              />
            )}
            {props.darkMode ? 'Light Mode' : 'Dark Mode'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              props.handleFilterToggle()
            }}
          >
            <FilterListIcon
              sx={{
                mr: 2,
              }}
            />
            {props.filter ? 'Show Past Buses' : 'Show Recent Buses'}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('/contact')
            }}
          >
            <MailIcon
              sx={{
                mr: 2,
              }}
            />
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
            <InfoIcon
              sx={{
                mr: 2,
              }}
            />
            About Us
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
