import React, {useContext} from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Button,
  Box,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'

import AppContext from '../../appContext'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const navItems = [
  {label: 'Story', path: '/'},
  {label: 'Archive', path: '/timeline'},
  {label: 'Team', path: '/about'},
  {label: 'Links', path: '/contact'},
]

export default function DesktopTopBar() {
  const navigate = useNavigate()

  const {darkMode, toggleDarkMode} = useContext(AppContext)

  return (
    <AppBar position="sticky" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar sx={{minHeight: 72, px: {md: 4, lg: 8}}}>
        <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1.5}}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: 'secondary.main',
              boxShadow: (theme) => theme.museum.dotGlow,
            }}
          />
          <Typography
            variant="h5"
            onClick={() => navigate('/')}
            sx={{cursor: 'pointer', letterSpacing: '-0.03em'}}
            color="text.primary"
          >
            SlugLoop
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Museum
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{alignItems: 'center'}}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              variant="text"
              color="inherit"
            >
              {item.label}
            </Button>
          ))}
          <Button
            onClick={() => navigate('/map')}
            variant="contained"
            color="secondary"
          >
            Open map
          </Button>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
