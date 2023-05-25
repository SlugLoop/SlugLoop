import React from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

export default function MobileTopBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const theme = useTheme()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  const handlePageChange = (path) => {
    setIsOpen(false)
    navigate(path)
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
          >
            SlugLoop
          </Typography>
        </Toolbar>
      </AppBar>
      <IconButton
        color={isOpen ? 'inherit' : 'inherit'}
        aria-label="menu"
        onClick={handleMenuToggle}
        sx={{
          position: 'fixed',
          right: theme.spacing(2),
          top: theme.spacing(1),
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{height: 0, opacity: 0}}
            animate={{height: '100vh', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 30,
            }}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: theme.palette.primary.main,
              zIndex: (theme) => theme.zIndex.drawer,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: 2,
              }}
            >
              <MotionTypography
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                variant="h6"
                onClick={() => handlePageChange('/about')}
              >
                About
              </MotionTypography>
              <MotionTypography
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                variant="h6"
                onClick={() => handlePageChange('/timeline')}
              >
                Timeline
              </MotionTypography>
              <MotionTypography
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                variant="h6"
                onClick={() => handlePageChange('/contact')}
              >
                Contact
              </MotionTypography>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}
