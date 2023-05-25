import React from 'react'
import {AppBar, Toolbar, Typography, Box, useTheme} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {AnimatePresence, motion} from 'framer-motion'
import './topbar.css'

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

          <div
            className="container"
            onClick={handleMenuToggle}
            style={{
              position: 'fixed',
              right: theme.spacing(2),
              top: theme.spacing(1),
              zIndex: theme.zIndex.drawer + 2,
            }}
          >
            <div className={`burger ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </Toolbar>
      </AppBar>

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
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
                variant="h6"
                onClick={() => handlePageChange('/about')}
              >
                About
              </MotionTypography>
              <MotionTypography
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
                variant="h6"
                onClick={() => handlePageChange('/timeline')}
              >
                Timeline
              </MotionTypography>
              <MotionTypography
                initial={{x: -100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: -100, opacity: 0}}
                transition={{
                  delay: 0.5,
                  duration: 0.3,
                  type: 'spring',
                  stiffness: 80,
                }}
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
