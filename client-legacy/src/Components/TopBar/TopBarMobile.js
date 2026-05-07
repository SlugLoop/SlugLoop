import React, {useContext} from 'react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import AppContext from '../../appContext'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const MotionBox = motion(Box)

const navItems = [
  {label: 'Story', path: '/'},
  {label: 'Archive', path: '/timeline'},
  {label: 'Team', path: '/about'},
  {label: 'Links', path: '/contact'},
  {label: 'Open map', path: '/map', primary: true},
]

export default function MobileTopBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const {darkMode, toggleDarkMode} = useContext(AppContext)

  const handlePageChange = (path) => {
    setIsOpen(false)
    navigate(path)
  }

  return (
    <>
      <AppBar position="sticky" sx={{zIndex: theme.zIndex.drawer + 1}}>
        <Toolbar sx={{minHeight: 68}}>
          <Box sx={{display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1.25}}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
              }}
            />
            <Typography
              variant="h5"
              onClick={() => navigate('/')}
              sx={{cursor: 'pointer', letterSpacing: '-0.03em'}}
            >
              SlugLoop
            </Typography>
          </Box>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            onClick={() => setIsOpen((open) => !open)}
            color="inherit"
            aria-label="toggle navigation"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{opacity: 0, y: -16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -16}}
            transition={{duration: 0.24}}
            sx={{
              position: 'fixed',
              inset: 0,
              pt: 12,
              px: 3,
              bgcolor: 'background.default',
              zIndex: theme.zIndex.drawer,
            }}
          >
            <Stack spacing={2}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handlePageChange(item.path)}
                  variant={item.primary ? 'contained' : 'outlined'}
                  color={item.primary ? 'secondary' : 'inherit'}
                  size="large"
                  sx={{justifyContent: 'flex-start'}}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}
