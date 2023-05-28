import React, {useContext} from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Button,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'

import AppContext from '../../appContext'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export default function DesktopTopBar() {
  const navigate = useNavigate()

  const {darkMode, setDarkMode} = useContext(AppContext)

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      >
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate('/')}
            style={{flexGrow: 1, cursor: 'pointer'}}
            color="text.primary"
          >
            SlugLoop
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Button
              onClick={() => navigate('/about')}
              variant="text"
              color="secondary"
            >
              About
            </Button>
            <Button
              onClick={() => navigate('/timeline')}
              variant="text"
              color="secondary"
            >
              Timeline
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              variant="text"
              color="secondary"
            >
              Contact
            </Button>
            <Button
              onClick={() => navigate('/map')}
              variant="text"
              color="secondary"
            >
              map
            </Button>
            <IconButton onClick={handleDarkModeToggle} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  )
}
